import path from "path"
import fs from 'fs'

export const posts = []
export const getPost = () => {
    return posts
}

export const createPost = (data) => {
    const id = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1
    const newPost = { id, ...data }
    posts.push(newPost)
    return newPost
}

export const getPostByUserId = (data) => {
    const allPostByUser = posts.filter(post => post.userId == data.id)
    if (allPostByUser.length === 0) {
        return null
    }
    return allPostByUser
}
export const checkPostExist = (data) => {
    const id = posts.find(post => post.id == data.id) || null
    return id
}

export const updatePost = (data) => {
    const index = posts.findIndex(post => post.id == data.id)
    console.log(index)
    if (index == -1) {
        return false
    }
    posts[index] = { ...posts[index], ...data }
    return posts[index]
}
export const deletePost = (data) => {
    const index = posts.findIndex(post => post.id == data.id)
    console.log(index)
    if (index == -1) {
        return index
    }
    const postToDelete = posts[index]
    const imagePath = path.join(process.cwd(), postToDelete.imageUrl)
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.log(err, "Error in deleting the image")
        }
        else {
            console.log("image deleted successfully")
        }
    })

    posts.splice(index, 1)
    return true
}

// for filtering post by caption

// saving post as draft
// archieving post

// sorting post by date

// bookmarking posts

// pagination for posts