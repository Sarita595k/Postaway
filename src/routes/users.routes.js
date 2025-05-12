import express, { Router } from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.send("router imported properly")
})


router.post('/signup', (req, res) => {
    res.send('hii signup')
})
export default router