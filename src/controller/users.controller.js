import { userList, addUserInList } from "../model/users.model.js";

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

export const addUsersInList = async () => {
    try {
        const { name, email, password } = req.body
        const response = await addUserInList({ name, email, password })
        res.status(201).json({
            message: "User created successfully",
            data: response
        })
    } catch (err) {
        res.status(401).json({
            message: "Error in adding user",
            error: err
        })
    }
}