import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "./public/upload");
  },
  filename: (req, file, cd) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cd(null, newFileName);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});


