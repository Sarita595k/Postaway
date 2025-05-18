import express, { Router } from 'express'
const router = express.Router()
import { createCommentsByPost, getAllCommentByPost } from '../controller/comment.controller.js'
// routes for comments
// route for getting all comment to a specific post
router.get('/:id', getAllCommentByPost)

// route for add a new comment to a specific post 
router.post('/:id', createCommentsByPost)

// route for updating a comment by id
// router.put('/:id')

// route for deleting a specific comment by id
// router.delete('/:id')
export default router