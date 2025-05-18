import { getAllComments, createComment, commentExist, updateComment } from "../model/comment.model.js";

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
        const { content } = req.body
        const comment = await createComment({ content })
        return res.status(200).json({
            message: "comment added successfully",
            data: comment
        })
    } catch (err) {

    }
}