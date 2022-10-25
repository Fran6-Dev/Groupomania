const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const upload = require("../middleware/multer");


//auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user display: 'block',
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', upload.single('profil'), userController.updateUser);
// router.put('/image/:id',  userController.getProfilPicture);
router.delete('/:id', userController.deleteUser);
// router.patch('/follow/:id', userController.follow); // a supp pour l'instant
// router.patch('/unfollow/:id', userController.unfollow); // a supp pour l'instant




module.exports = router;


