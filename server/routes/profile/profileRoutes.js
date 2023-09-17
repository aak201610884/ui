const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profileController/profileController');
const multer = require('multer');
 const path=require('path') 
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define routes for profile creation
router.post('/create', upload.single('profilePicture'), profileController.createProfile);
router.get('/:profileId', profileController.getProfileById);
router.get('/', profileController.getAllProfiles);

module.exports = router;
