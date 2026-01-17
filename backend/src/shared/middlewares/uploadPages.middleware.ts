import multer from 'multer'

export const uploadChapterPages = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
});
