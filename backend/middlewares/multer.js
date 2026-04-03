import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import cloudinary from '../configs/cloudinary.js'


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "problem_reports",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

export default upload;