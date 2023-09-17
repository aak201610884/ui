// Import necessary modules and controllers
const express = require('express');
const router = express.Router();

const followingController = require('../../controllers/profileController/FollowingController');


// Define routes for the Following resource
router.get('/:userID', followingController.getAllFollowersById);
router.post('/', followingController.addFollower);
router.delete('/:userID/:followingID', followingController.removeFollower);

module.exports = router;
