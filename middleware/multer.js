const UserModel = require('../models/user.model')
const multer = require("multer");

  const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        if(file.fieldname === "profil") callback(null, './images/profil');
        else if(file.fieldname === "post") callback(null, './images/posts');
        
    },
    filename: (req, file, callback) => {
        callback(null, "user-profil.jpg");
    },
  });

    const upload = multer({ storage : storage });

    module.exports = upload;