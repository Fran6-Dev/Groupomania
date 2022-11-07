const multer = require("multer");

// Permet de gérer les fichiers entrants

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    if (file.fieldname === "profil") callback(null, './client/public/images/profil');
    else if (file.fieldname === "file") callback(null, './client/public/images/posts');

  },
  filename: (req, file, callback) => {

    let fileName = Date.now() + ".jpg";

    if (file.fieldname === "profil") callback(null, 'test.jpg');
    else if (file.fieldname === "file") callback(null, fileName);

  },
});






const upload = multer({ storage: storage });

module.exports = upload;