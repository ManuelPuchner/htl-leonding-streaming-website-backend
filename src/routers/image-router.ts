import express from "express";
import multer from "multer";
import filenamify from "filenamify";

export const imageRouter = express.Router();

const uploadFolderName = "../../public/images";
const IMG_FILE_SIZE = 1024 * 1024 * 10; // 10MB

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolderName)
    },
    filename: function (req, file, cb) {

        const uniqueSuffix =
        new Date().toISOString().replace(/:|\./g, "-") +
        "_" +
        Math.round(Math.random() * 1e9);

        const filename = `${uniqueSuffix}_${filenamify(file.originalname, {
         replacement: "-",
        }).replace(/ /g, "-")}`;

        cb(null, file.filename)
    }
})

const upload = multer({
  limits: {
    fileSize: IMG_FILE_SIZE,
  },
  storage: storage,
  fileFilter: (req, file, cb) => {
    const acceptFile: boolean = ["image/jpeg", "image/png"].includes(
      file.mimetype
    );
    cb(null, acceptFile);
  },
});

imageRouter.post("/", upload.single("image"), async (req, res) => {
    const file = req.file;
    if (!file) {
        res.sendStatus(400), "No file uploaded";
        return;
    }
    const imagePathClient = req.file.path.replace("public", "");

    res.status(200).json({message: "success", path: imagePathClient});
});
