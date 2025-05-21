import { getPost, createPost, checkPostExist, updatePost, deletePost, posts, getPostByUserId } from "../model/posts.model.js";
import { catchAsync } from "../utils/catchAsync.js"


export const retriveAllPosts = catchAsync(async (req, res) => {
    const allPosts = await getPost()
    return res.status(200).json({
        message: "All posts are:",
        data: allPosts
    })
})

export const createPostByUser = catchAsync(async (req, res, next) => {
    const { caption } = req.body
    const file = req.file
    const username = req.user.name
    const userId = req.user.id
    if (!file || !caption) {
        const error = new Error("Fields are missing.")
        error.statusCode = 400
        return next(error)
    }
    const imageUrl = `/uploads/${file.filename}`
    const postResponse = await createPost({ imageUrl, caption, userId, username })
    return res.status(201).json({
        message: "post created Successfully",
        data: postResponse
    })
})

export const findPostByUser = catchAsync(async (req, res) => {
    const { id } = req.params
    const response = await getPostByUserId({ id })
    return res.status(200).json({
        message: "The list of user is:",
        data: response
    })
})

export const updatePostByUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    // const username = req.user.name
    const userId = req.user.id
    const checkIdExist = await checkPostExist({ id })
    if (!checkIdExist) {
        const error = new Error("no post exist with the given id")
        error.statusCode = 404
        return next(error)
    }
    if (checkIdExist.userId !== userId) {
        const error = new Error("You are not authorize to update this post")
        error.statusCode = 401
        return next(error)
    }
    const { caption } = req.body
    const file = req.file
    const imageUrl = file ? `/uploads/${file.filename}` : checkIdExist.imageUrl
    const updatedData = await updatePost({ id, imageUrl, caption })
    return res.status(200).json({
        message: "post updated",
        data: updatedData
    })
})

export const deletePostById = catchAsync(async (req, res) => {
    const id = req.params.id
    const post = posts.find(post => post.id == id)
    if (!post) {
        const error = new Error("post not exist")
        error.statusCode = 404
        return next(error)
    }
    const imageUrl = post.imageUrl
    const response = await deletePost({ id, imageUrl })
    if (!response) {
        const error = new Error("Id not exist. Check Id once.")
        error.statusCode = 404
        return next(error)
    }
    return res.status(201).json({
        message: "Post deleted Successfully"
    })
})

// for filtering post by caption

// saving post as draft
// archieving post

// sorting post by date

// bookmarking posts

// pagination for posts