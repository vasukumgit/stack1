const router = require("express").Router();
const authController = require("../controllers/authController");
 
// Check user (login/signup flow)
router.post("/check-user", authController.checkUser);
 
// Create new user (Signup)
router.post("/create-user", authController.createUser);
 
// Send OTP (Existing user)
router.post("/send-otp", authController.sendOtp);
 
// Verify OTP
router.post("/verify-otp", authController.verifyOtp);
 
module.exports = router;
 
