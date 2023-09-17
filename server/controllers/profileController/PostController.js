const Post = require('../../models/profile/Post');
const UserProfile = require('../../models/profile/UserProfile');
const CustomError = require('../../helpers/CustomError'); // You need to define your CustomError class.

// Create a new post
const createPost = async (req, res) => {
  const { title, text, images, userID } = req.body;

  try {
    // Check if the user profile exists
    const userProfileDoc = await UserProfile.findById(userID);
    if (!userProfileDoc) {
      throw new CustomError(404, 'User profile not found');
    }

    // Create a new post document
    const newPost = new Post({
      title,
      text,
      images,
      profile: userID, // Associate the post with the user's profile
    });

    // Save the new post
    await newPost.save();

    res.status(201).json({
      success: true,
      data: newPost,
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

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('profile');

    res.status(200).json({
      success: true,
      data: posts,
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

// Get a single post by ID
const getPostById = async (req, res) => {
  const { postID } = req.params;

  try {
    const post = await Post.findById(postID).populate('profile');
    if (!post) {
      throw new CustomError(404, 'Post not found');
    }

    res.status(200).json({
      success: true,
      data: post,
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

// Update a post by ID
const updatePostById = async (req, res) => {
  const { postID } = req.params;
  const { title, text, images } = req.body;

  try {
    const post = await Post.findById(postID);
    if (!post) {
      throw new CustomError(404, 'Post not found');
    }

    // Update post fields
    post.title = title;
    post.text = text;
    post.images = images;

    // Save the updated post
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
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

// Delete a post by ID
const deletePostById = async (req, res) => {
  const { postID } = req.params;

  try {
    const post = await Post.findById(postID);
    if (!post) {
      throw new CustomError(404, 'Post not found');
    }

    // Delete the post
    await post.remove();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
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
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};

