const multer = require("multer");


  const storage = multer.diskStorage({

    destination: (req,file,callback) => {
        if(file.fieldname === "profil") callback(null, './images/profil');
        else if(file.fieldname === "posts") callback(null, './images/posts');
        
    },
    filename: (req, file, callback) => {
         if(file.fieldname === "profil") callback(null, "user-profil.jpg");
         else if(file.fieldname === "posts") callback(null, Date.now() + ".jpg");
    },
  });

    const upload = multer({ storage : storage });

    module.exports = upload;