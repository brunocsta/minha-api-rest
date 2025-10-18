import multer from "multer";
import { extname, resolve } from "path";

const randomNum = () => Math.floor(Math.random() * 10000 + 20000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new multer.MulterError("Arquivo precisa ser PNG ou JPG"));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomNum()}${extname(file.originalname)}`);
    },
  }),
};
