const express = require('express');
const router = express.Router();
const postController = require ('../controllers/post.controller');
const upload = require("../middleware/multer");



router.get('/', postController.readPost);
router.post('/', upload.single('posts'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost); 

module.exports = router;