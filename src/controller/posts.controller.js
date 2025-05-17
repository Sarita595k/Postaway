import { getPost, createPost, checkPostExist, updatePost } from "../model/posts.model.js";

export const retriveAllPosts = (req, res) => {
    try {
        const allPosts = getPost()
        return res.status(200).json({
            message: "All posts are:",
            data: allPosts
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in fetching all posts",
            error: err.message
        })
    }
}

export const createPostByUser = async (req, res) => {
    try {
        const { caption } = req.body
        const file = req.file
        const username = req.user.name
        const userId = req.user.id
        if (!file || !caption) {
            return res.status(400).json({
                message: "Fields are missing."
            })
        }
        const imageUrl = `/uploads/${file.filename}`

        const postResponse = await createPost({ imageUrl, caption, userId, username })
        return res.status(201).json({
            message: "post created Successfully",
            data: postResponse
        })

    } catch (err) {
        return res.status(400).json({
            message: "Error in creating post",
            error: err.message
        })
    }
}


export const updatePostByUser = async (req, res) => {
    try {
        const { id } = req.params
        const checkIdExist = checkPostExist({ id })
        if (!checkIdExist) {
            return res.status(404).json({
                message: "no post exist with the given id"
            })
        }
        const { caption } = req.body
        const file = req.file
        const imageUrl = file ? `/uploads/${file.filename}` : checkIdExist.imageUrl
        // const username = req.user.name
        // const userId = req.user.id
        const updatedData = await updatePost({ id, imageUrl, caption })
        return res.status(201).json({
            message: "post updated",
            data: updatedData
        })
    } catch (err) {
        return res.send(" post exist with the given id")
    }
}
