import express from "express";
import multer from "multer";
import filenamify from "filenamify";

export const imageRouter = express.Router();

const uploadFolderName = "../../../htl-leonding-streaming-website-frontend/src/assets/images";
const IMG_FILE_SIZE = 1024 * 1024 * 10; // 10MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderName);
  },
 });

const upload = multer({
  limits: {
    fileSize: IMG_FILE_SIZE,
  },
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(null, true);
  },
});

imageRouter.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.sendStatus(400), "No file uploaded";
    return;
  }
  const imagePathClient = req.file.path.replace("public", "");

  res.status(200).json({ message: "success", path: imagePathClient });
});
