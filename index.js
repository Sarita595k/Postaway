import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import Router from "./src/routes/users.routes.js"
import postsRouter from "./src/routes/posts.routes.js"
import commentsRouter from "./src/routes/comments.routes.js"
import likesRouter from './src/routes/likes.routes.js'
import multer from 'multer'
import logger from './src/middleware/logger.js'
import { errorMiddleware } from './src/middleware/errorHandling.js'
import swaggerui from "swagger-ui-express"
import swaggerJson from './Documentation/swagger.json' assert{type: "json"}


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use('/api/docs', swaggerui.serve, swaggerui.setup(swaggerJson))

// using logger middleware for each request
app.use(logger)
// user router 
app.use('/api', Router)

// posts router 
app.use('/api/posts', postsRouter)

// comments router 
app.use('/api/comments', commentsRouter)

// likes router 
app.use('/api/likes', likesRouter)

// error handler middleware 
app.use(errorMiddleware)
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