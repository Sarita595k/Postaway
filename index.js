import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import Router from "./src/routes/users.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', Router)

app.listen(process.env.PORT, () => {
    console.log("server is running")
})