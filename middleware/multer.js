const multer = require("multer");

  let postname;

  const storage = multer.diskStorage({

    destination: (req,file,callback) => {
        if(file.fieldname === "profil") callback(null, './images/profil');
        else if(file.fieldname === "posts") callback(null, './images/posts');
        
    },
    filename: (req, file, callback) => {
      postname = Date.now() + ".jpg";
         if(file.fieldname === "profil") callback(null, "user-profil.jpg");
         else if(file.fieldname === "posts") callback(null, postname);
        console.log('POST', postname)
    },
  });
  console.log('POST22222', postname)

    const upload = multer({ storage : storage });

    module.exports = upload;