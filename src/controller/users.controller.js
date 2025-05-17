import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { userList, addUserInList, checkUserExist } from "../model/users.model.js";

// controller to get list of all users
export const getUsersList = (req, res) => {
    try {
        const response = userList()
        res.status(200).json({
            message: "data fetched successfully",
            data: response
        })
    } catch (err) {
        res.status(500).json({
            message: "Data not fetched.Error occured.",
            error: err.message
        })
    }
}

// controller to register new user in the list 
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const userExist = await checkUserExist({ email })
        if (userExist) {
            return res.status(401).json({
                message: "User already exist.Try with a different email or login"
            })
        }
        const response = await addUserInList({ name, email, password: hashedPassword })
        const token = jwt.sign(response, process.env.SECRET_KEY, { expiresIn: '15m' })
        res.status(201).json({
            message: "User created successfully",
            data: response,
            token: token
        })
    } catch (err) {
        res.status(401).json({
            message: "Error in adding user",
            error: err.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await checkUserExist({ email })
        if (!userExist) {
            return res.status(401).json({
                message: "User not exist.Try to register first."
            })
        }
        const checkPassword = await bcrypt.compare(password, userExist.password)
        if (!checkPassword) {
            return res.status(401).json({
                message: "Wrong password.Try again."
            })
        }
        const token = jwt.sign(userExist, process.env.SECRET_KEY, { expiresIn: '15m' })
        res.status(200).json({
            message: "Welcome to your dashboard",
            data: userExist
        })
    } catch (err) {
        res.status(401).json({
            message: "Error in adding user",
            error: err.message
        })
    }
}