import { addLike, deleteLike, getAllLikes } from "../model/like.model.js"
import { catchAsync } from "../utils/catchAsync.js"


// to get all the likes on a post 
export const getAllLikesOnPost = catchAsync(async (req, res) => {
    const { id } = req.params
    const response = await getAllLikes({ id })
    return res.status(200).json({
        message: "All liked on this post",
        data: response
    })
})

// to add a like on the post 
export const addLikeOnAPost = catchAsync(async (req, res, next) => {
    const { id: postId } = req.params
    const { like } = req.body
    const { userId } = req.user
    const liked = await addLike({ like, userId, postId })
    if (!liked) {
        const error = new Error("already liked the post ")
        error.statusCode = 400
        return next(error)
    }
    return res.status(200).json({
        message: "post liked successfully",
        data: liked
    })
})

// to delete like from a post 
export const deletePostLike = catchAsync(async (req, res) => {
    const { id } = req.params
    const response = await deleteLike({ id })
    if (!response) {
        const error = new Error("Id not exist.")
        error.statusCode(404)
        return next(error)
    }
    return res.status(200).json({
        message: "like deleted successfully.",
        data: response
    })
})