import { getAllComments, createComment, commentExist, updateComment, deleteComment } from "../model/comment.model.js";
import { checkPostExist } from "../model/posts.model.js";
import { catchAsync } from "../utils/catchAsync.js"

// to get all the comment by the post 
export const getAllCommentByPost = catchAsync(async (req, res) => {
    const { id } = req.params
    console.log(id)
    const response = await getAllComments({ id })
    return res.status(200).json({
        message: "All comments by this post",
        data: response
    })
})

// to create comments by post 
export const createCommentsByPost = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const userId = req.user.userId
    const { id: postId } = req.params
    const { content } = req.body
    const checkPost = await checkPostExist({ id })
    if (!checkPost) {
        const error = new Error("no post exist with the given id check with a valid id")
        error.statusCode = 404
        return next(error)
    }
    const comment = await createComment({ content, userId, postId })
    return res.status(200).json({
        message: "comment added successfully",
        data: comment
    })
})

// to update comment by id 
export const updateCommentById = catchAsync(async (req, res, next) => {

    const { id } = req.params
    const { content } = req.body
    const response = updateComment({ id, content })
    if (!response) {
        const error = new Error("Error in updating comments.")
        error.statusCode = 404
        return next(error)
    }
    return res.status(200).json({
        message: "Comment updated successfully",
        comment: response
    })
})


export const deleteCommentById = catchAsync(async (req, res) => {

    const { id } = req.params
    const response = deleteComment({ id })
    if (!response) {
        const error = new Error("Id not exist.")
        error.statusCode = 400
    }
    return res.status(200).json({
        message: "Comment deleted successfully.",
        data: response
    })
})