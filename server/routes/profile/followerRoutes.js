// Import necessary modules and controllers
const express = require('express');
const router = express.Router();

const followerController = require('../../controllers/profileController/FollowerController');


router.get('/:userID', followerController.getAllFollowersById);
router.post('/', followerController.addFollower);
router.delete('/:userID/:followingID', followerController.removeFollower);

module.exports = router;
