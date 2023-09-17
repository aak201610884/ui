const Follower = require('../../models/profile/Follower');
const UserProfile = require('../../models/profile/UserProfile');
const CustomError = require('../../helpers/CustomError'); // You need to define your CustomError class.

// Get all followers of a user by user ID
const getAllFollowersById = async (req, res) => {
  const { userID } = req.params; // Assuming you're passing the user ID in the URL parameters.

  try {
    // Check if the user profile exists
    const userProfileDoc = await UserProfile.findById(userID);
    if (!userProfileDoc) {
      throw new CustomError(404, 'User profile not found');
    }

    // Find all followers of the user
    const followers = await Follower.find({ profile: userID }).populate('profile');

    // Return the followers
    res.status(200).json({
      success: true,
      data: followers,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};

// Add a new follower to a user's profile
const addFollower = async (req, res) => {
  const { userID, followerID } = req.body;

  try {
    // Check if both user profiles exist
    const userProfileDoc = await UserProfile.findById(userID);
    const followerProfileDoc = await UserProfile.findById(followerID);

    if (!userProfileDoc || !followerProfileDoc) {
      throw new CustomError(404, 'User profile(s) not found');
    }

    // Create a new Follower document to represent the follower
    const newFollower = new Follower({
      profile: followerID,
    });

    // Save the new follower relationship
    await newFollower.save();

    res.status(201).json({
      success: true,
      data: newFollower,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};

// Remove a follower from a user's profile
const removeFollower = async (req, res) => {
  const { userID, followerID } = req.params;

  try {
    // Check if both user profiles exist
    const userProfileDoc = await UserProfile.findById(userID);
    const followerProfileDoc = await UserProfile.findById(followerID);

    if (!userProfileDoc || !followerProfileDoc) {
      throw new CustomError(404, 'User profile(s) not found');
    }

    // Find and delete the follower relationship
    await Follower.findOneAndDelete({ profile: followerID });

    res.status(200).json({
      success: true,
      message: 'Follower removed successfully',
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};

module.exports = {
  getAllFollowersById,
  addFollower,
  removeFollower,
};
