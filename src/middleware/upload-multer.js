import { v4 as uuidv4 } from 'uuid';

import path from "path";
const UPLOAD_DIR = path.join(__dirname, "../public");
const maxSize = 10*1024
import multer from '@koa/multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const fileName = uuidv4() + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});
const uploadOnlyImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const uploadAllFile = multer({
    storage: storage
});
export {
    uploadOnlyImage,
    uploadAllFile
};