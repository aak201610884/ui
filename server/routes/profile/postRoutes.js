const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploads

const postController = require('../../controllers/profileController/PostController');


// Define routes for image uploads for the Post resource
router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get(':postID', postController.getPostById);
router.put(':postID', postController.updatePostById);
router.delete(':postID', postController.deletePostById);


module.exports = router;
