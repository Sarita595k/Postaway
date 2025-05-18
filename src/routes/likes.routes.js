import express, { Router } from 'express'
const router = express.Router()
import { addLikeOnAPost, deletePostLike, getAllLikesOnPost } from '../controller/like.controller.js'
import { auth } from '../middleware/auth.js'
// router for get likes of a specific post 
router.get('/:postId', auth, getAllLikesOnPost)

// route for adding like on a post 
router.post('/:postId', auth, addLikeOnAPost)

// route for deleting like by id 
router.delete('/:id', auth, deletePostLike)

export default router