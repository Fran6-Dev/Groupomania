const multer = require("multer");
// const path = require("path")

// const MIME_TYPES = {
//     "image/jpg": "jpg",
//     "image/jpeg": "jpg",
//     "image/png": "png",
//   };

  const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        if(file.fieldname === "profil") callback(null, './images/profil');
        else if(file.fieldname === "post") callback(null, './images/posts');
        
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
  });

    const upload = multer({ storage : storage });

    module.exports = upload;