import multer from "multer";
import os from "os";

const tempDir = os.tmpdir();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.fullName);
  },
  
});

const multerUpload = multer({ storage: storage });

export default multerUpload;
