import express, { Router } from 'express'
const router = express.Router()
import { createCommentsByPost, getAllCommentByPost, updateCommentById, deleteCommentById } from '../controller/comment.controller.js'

import { auth } from '../middleware/auth.js'
// routes for comments
// route for getting all comment to a specific post
router.get('/:id', auth, getAllCommentByPost)

// route for add a new comment to a specific post 
router.post('/:id', auth, createCommentsByPost)

// route for updating a comment by id
router.put('/:id', auth, updateCommentById)

// route for deleting a specific comment by id
router.delete('/:id', auth, deleteCommentById)
export default router