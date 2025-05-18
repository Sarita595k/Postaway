import { addLike, deleteLike, getAllLikes } from "../model/like.model.js"

export const getAllLikesOnPost = (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const response = getAllLikes({ id })
        return res.status(200).json({
            message: "All liked on this post",
            data: response
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in fetching comments.",
            error: err.message
        })
    }
}

export const addLikeOnAPost = async (req, res) => {
    try {
        const { id } = req.params
        const { id: postId } = req.params
        const { like } = req.body
        const { userId } = req.user
        const liked = await addLike({ like, userId, postId })
        if (!liked) {
            return res.status(400).json({
                message: "already liked the post ",
            })
        }
        return res.status(200).json({
            message: "post liked successfully",
            data: liked
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in like.",
            error: err.message
        })
    }
}
export const deletePostLike = (req, res) => {
    try {
        const { id } = req.params
        const response = deleteLike({ id })
        if (!response) {
            return res.status(400).json({
                message: "Id not exist.",
            })
        }
        return res.status(200).json({
            message: "like deleted successfully.",
            data: response
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in deleting like.",
            error: err.message
        })
    }
}