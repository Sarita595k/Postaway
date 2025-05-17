import multer from 'multer'
import path from 'path'
import fs from 'fs'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads'
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileType = ['image/jpg', 'image/jpeg', 'image/png']
    if (allowedFileType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("invalid file Type.Only JPEG,JPG AND PNG files are allowed"), false)
    }
}
export const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: fileFilter })