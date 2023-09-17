const router=require('express').Router();
const userCtrl=require('../controllers/userController');

router.post('/signup',userCtrl.signup)
router.post('/login',userCtrl.login)

router.get("/auth/google",userCtrl.authGoogle)
router.get("/auth/google/failure",userCtrl.AuthGoogleFailed)
router.get("/logout/google",userCtrl.logoutGoogle)

router.post('/logout',userCtrl.logout)
router.post('/forgot',userCtrl.forgotPassword)
router.patch("/reset",userCtrl.resetPassword)
//get all user
router.get("/",userCtrl.getAllUser)
//get userid

//get user by id
router.get("/:emailId",userCtrl.getUserByEmail)


module.exports=router