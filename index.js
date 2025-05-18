import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import Router from "./src/routes/users.routes.js"
import router from "./src/routes/comments.routes.js"
import multer from 'multer'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// user router 
app.use('/api', Router)

// posts router 
app.use('/api/posts', Router)

// comments router 
app.use('/api/comments', router)
// error handling middleware for multer 
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message.includes("invalid file type")) {
        return res.status(400).json({
            message: "Invalid file type"
        })
    }
    next(err)
})

app.listen(process.env.PORT, () => {
    console.log("server is running")
})