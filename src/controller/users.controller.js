import { userList, addUserInList } from "../model/users.model.js";

export const getUsersList = (req, res) => {
    try {
        const response = userList()
        res.status(200).json({
            message: "data fetched successfully",
            data: response
        })
    } catch (err) {
        res.status(402).json({
            message: "Data not fetched.Error occured.",
            error: err.message
        })
    }
}