import express, { Router } from 'express'
const router = express.Router()
import { getUsersList, registerUser, loginUser } from '../controller/users.controller.js'

// router to get all the user from the list 
router.get('/', getUsersList)

// route for registration
router.post('/signup', registerUser)

// route for login 
router.post('/signin', loginUser)

export default router