import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(400).json({
                message: "Login or register first"
            })
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {

    }
}