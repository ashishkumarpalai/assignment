// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // User Registration Route
// router.post('/register', userController.register);

// // User Login Route
// router.post('/login', userController.login);

// module.exports = router;





// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Request OTP
router.post('/request-otp', userController.requestOTP);

// Verify OTP and login
router.post('/verify-otp', userController.verifyOTP);

module.exports = router;
