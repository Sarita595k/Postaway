import express, { Router } from 'express'
const router = express.Router()
import { createPostByUser, retriveAllPosts, updatePostByUser, deletePostById, findPostByUser } from '../controller/posts.controller.js'
import { auth } from '../middleware/auth.js'
import { upload } from '../middleware/fileUpload.js'
// route for post 
// route for all posts
router.get('/all', auth, retriveAllPosts)

// route for creating post 
router.post('/create', auth, upload.single('imageUrl'), createPostByUser)

// route for fetching the post by userId
router.get('/:id', auth, findPostByUser)
// route for updating the post 
router.put('/:id', auth, upload.single('imageUrl'), updatePostByUser)

// route for delete the posts 
router.delete('/:id', auth, deletePostById)

export default router