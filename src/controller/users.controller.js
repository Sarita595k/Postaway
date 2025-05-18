import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { userList, addUserInList, checkUserExist } from "../model/users.model.js";
import { catchAsync } from '../utils/catchAsync.js';


// controller to get list of all users
export const getUsersList = catchAsync(async (req, res) => {
    const response = await userList()
    res.status(200).json({
        message: "data fetched successfully",
        data: response
    })
})

// controller to register new user in the list 
export const registerUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const userExist = await checkUserExist({ email })
    if (userExist) {
        const error = new Error("User already exist.Try with a different email or login")
        error.statusCode = 401
        return next(error)
    }
    const response = await addUserInList({ name, email, password: hashedPassword })
    const token = jwt.sign(response, process.env.SECRET_KEY, { expiresIn: '15m' })
    res.status(201).json({
        message: "User created successfully",
        data: response,
        token: token
    })
})

export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const userExist = await checkUserExist({ email })
    if (!userExist) {
        const error = new Error("User not exist.Try to register first.")
        error.statusCode = 401
        return next(error)
    }
    const checkPassword = await bcrypt.compare(password, userExist.password)
    if (!checkPassword) {
        const error = new Error("Wrong password.Try again.")
        error.statusCode = 401
        return next(error)
    }
    const token = jwt.sign(userExist, process.env.SECRET_KEY, { expiresIn: '15m' })
    res.status(200).json({
        message: "Welcome to your dashboard",
        data: userExist,
        token: token
    })
})