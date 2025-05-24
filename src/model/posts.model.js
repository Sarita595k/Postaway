import path from "path"
import fs from 'fs'

// posts array
export const posts = []

// to get all posts
export const getPost = () => {
    return posts
}

// to create posts 
export const createPost = (data) => {
    const id = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1
    const newPost = { id, ...data }
    posts.push(newPost)
    return newPost
}

// get post by the user id
export const getPostByUserId = (data) => {
    const allPostByUser = posts.filter(post => post.userId == data.id)
    if (allPostByUser.length === 0) {
        return null
    }
    return allPostByUser
}

// check post exists 
export const checkPostExist = (data) => {
    const id = posts.find(post => post.id == data.id) || null
    return id
}

// update posts 
export const updatePost = (data) => {
    const index = posts.findIndex(post => post.id == data.id)
    console.log(index)
    if (index == -1) {
        return false
    }
    posts[index] = { ...posts[index], ...data }
    return posts[index]
}

// delete posts 
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