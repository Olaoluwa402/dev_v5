import multer from "multer";
import path from "path";


// Form data with file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          "-" +
          file.originalname.slice(0, file.originalname.lastIndexOf(".")) +
          "-" +
          Date.now() +
          Math.random() * 10000000 +
          path.extname(file.originalname)
      );
    },
  });
  
  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|webp/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images of type webp, jpeg, jpg, and png Only!", false);
    }
  }
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 40000000000 }, // 400 kilobytes
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });
  
  export { upload };