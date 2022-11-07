const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const upload = require("../middleware/multer");

// Route permettant de controller les posts au sein de l'application

router.get('/', postController.readPost);
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', upload.single('file'), postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);


module.exports = router;