import multer from 'multer'

export const uploadSinglePicture = multer({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }
})