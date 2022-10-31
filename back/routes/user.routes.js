const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const upload = require("../middleware/multer");


//auth
router.post('/admin', authController.createAdmin);
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);


// user display: 'block',
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', upload.single('profil'), userController.updateUser);
router.delete('/:id', userController.deleteUser);





module.exports = router;


