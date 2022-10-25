const multer = require("multer");
const UserModel = require('../models/user.model');



const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    if (file.fieldname === "profil") callback(null, './client/public/images/profil');
    else if (file.fieldname === "posts") callback(null, './client/public/images/posts');

  },
  filename: (req, file, callback) => {

    const name = body;

    console.log(name);


    if (file.fieldname === "profil") callback(null, 'test.jpg');
    else if (file.fieldname === "posts") callback(null, Date.now() + ".jpg");


  },
});





const upload = multer({ storage: storage });

module.exports = upload;