import { getPost, createPost, checkPostExist, updatePost, deletePost, posts, getPostByUserId } from "../model/posts.model.js";

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

export const findPostByUser = (req, res) => {
    try {
        const { id } = req.params
        const response = getPostByUserId({ id })
        return res.status(200).json({
            message: "The list of user is:",
            data: response
        })
    } catch (err) {
        return res.status(400).json({
            message: "Error in getting user's post",
            error: err.message
        })
    }
}

export const updatePostByUser = async (req, res) => {
    try {
        const { id } = req.params
        // const username = req.user.name
        const userId = req.user.id
        const checkIdExist = checkPostExist({ id })
        if (!checkIdExist) {
            return res.status(404).json({
                message: "no post exist with the given id"
            })
        }
        if (checkIdExist.userId !== userId) {
            return res.status(401).json({
                message: "You are not authorize to update this post"
            })
        }
        const { caption } = req.body
        const file = req.file
        const imageUrl = file ? `/uploads/${file.filename}` : checkIdExist.imageUrl
        const updatedData = await updatePost({ id, imageUrl, caption })
        return res.status(201).json({
            message: "post updated",
            data: updatedData
        })
    } catch (err) {
        return res.status(404).json({
            message: " post exist with the given id",
            error: err.message
        })
    }
}

export const deletePostById = async (req, res) => {
    try {
        const id = req.params.id
        const post = posts.find(post => post.id == id)
        if (!post) {
            return res.status(404).json({
                message: "post not exist."
            })
        }
        const imageUrl = post.imageUrl
        const response = await deletePost({ id, imageUrl })
        if (!response) {
            return res.status(404).json({
                message: "Id not exist. Check Id once."
            })
        }
        return res.status(201).json({
            message: "Post deleted Successfully"
        })
    } catch (err) {
        return res.status(404).json({
            message: "unable to delete post with the given id",
            error: err.message
        })
    }
}