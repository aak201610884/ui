// profileController.js
const UserProfile =require('../../models/profile/UserProfile')
exports.createProfile = async (req, res) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, address, phoneNumber } = req.body;
    const userProfile = new UserProfile({ firstName, lastName, gender, dateOfBirth, address, phoneNumber });
    if (req.file) {
      userProfile.profilePicture = req.file.path;
    }
    const userId = req.body.userId;
    userProfile.user = userId;
    await userProfile.save();

    res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user profile' });
  }
};
exports.getProfileById = async (req, res) => {
  try {
      const profileId = req.params.profileId;
      
      const userProfile = await UserProfile.findById(profileId).exec();

      if (!userProfile) {
          return res.status(404).json({ error: 'Profile not found' });
      }

      res.json(userProfile);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all user profiles
exports.getAllProfiles = async (req, res) => {
  try {
      const profiles = await UserProfile.find().exec();
      res.json(profiles);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};