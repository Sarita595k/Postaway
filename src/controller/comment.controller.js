import { getAllComments, createComment, commentExist, updateComment, deleteComment } from "../model/comment.model.js";
import { checkPostExist } from "../model/posts.model.js";

export const getAllCommentByPost = (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const response = getAllComments({ id })
        return res.status(200).json({
            message: "All comments by this post",
            data: response
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in fetching comments.",
            error: err.message
        })
    }
}

export const createCommentsByPost = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.userId
        const { id: postId } = req.params
        const { content } = req.body
        const checkPostExist = await checkPostExist({ id })
        if (!checkPostExist) {
            return res.status(404).json({
                message: "no post exist with the given id check with a valid id."
            })
        }
        const comment = await createComment({ content, userId, postId })
        return res.status(200).json({
            message: "comment added successfully",
            data: comment
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in creating comments.",
            error: err.message
        })
    }
}

export const updateCommentById = async (req, res) => {
    try {
        const { id } = req.params
        const { content } = req.body
        const response = updateComment({ id, content })
        if (!response) {
            return res.status(400).json({
                message: "Error in updating comments."
            })
        }
        return res.status(200).json({
            message: "Comment updated successfully",
            comment: response
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in updating comments.",
            error: err.message
        })
    }
}


export const deleteCommentById = (req, res) => {
    try {
        const { id } = req.params
        const response = deleteComment({ id })
        if (!response) {
            return res.status(400).json({
                message: "Id not exist.",
            })
        }
        return res.status(200).json({
            message: "Comment deleted successfully.",
            data: response
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in deleting comments.",
            error: err.message
        })
    }
}