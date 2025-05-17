import express, { Router } from 'express'
const router = express.Router()
import { getUsersList, registerUser, loginUser } from '../controller/users.controller.js'
import { createPostByUser, retriveAllPosts } from '../controller/posts.controller.js'
import { auth } from '../middleware/auth.js'
import { upload } from '../middleware/fileUpload.js'

// router to get all the user from the list 
router.get('/', getUsersList)

// route for registration
router.post('/signup', registerUser)

// route for login 
router.post('/signin', loginUser)

// route for all posts
router.get('/all', auth, retriveAllPosts)

// route for creating post 
router.post('/create', auth, upload.single('imageUrl'), createPostByUser)

export default router