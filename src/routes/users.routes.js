import express, { Router } from 'express'
const router = express.Router()
import { getUsersList } from '../controller/users.controller.js'

router.get('/', getUsersList)


router.post('/signup', (req, res) => {
    res.send('hii signup')
})
router.post('/signin', (req, res) => {
    res.send("welcome to signin page")
})
export default router