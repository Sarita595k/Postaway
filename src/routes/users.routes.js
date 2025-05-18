import express, { Router } from 'express'
const router = express.Router()
import { getUsersList, registerUser, loginUser } from '../controller/users.controller.js'
import { createPostByUser, retriveAllPosts, updatePostByUser, deletePostById, findPostByUser } from '../controller/posts.controller.js'
import { auth } from '../middleware/auth.js'
import { upload } from '../middleware/fileUpload.js'


// router to get all the user from the list 
router.get('/', getUsersList)

// route for registration
router.post('/signup', registerUser)

// route for login 
router.post('/signin', loginUser)


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