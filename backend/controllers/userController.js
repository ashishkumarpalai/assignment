// const { registerUser, loginUser } = require('../models/userModel');

// // Register User Controller
// exports.register = async (req, res) => {
//     try {
//         const { email, password, username } = req.body;

//         if (!email || !password || !username) {
//             return res.status(400).json({ error: 'Email, Username, and Password are required' });
//         }

//         const newUser = await registerUser({ email, password, username });
//         res.status(201).json({ message: 'User registered successfully', user: newUser });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Login User Controller
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: 'Email and Password are required' });
//         }

//         const loginData = await loginUser(email, password);
//         res.status(200).json({ message: 'User logged in successfully', ...loginData });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };









// controllers/userController.js
const db = require('../config/firebase');
const { generateOTP, sendOTPEmail } = require('../utils/otpUtils');
const jwt = require('jsonwebtoken');

const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

// Request OTP
exports.requestOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const otp = generateOTP();
        const otpExpiresAt = Date.now() + OTP_EXPIRATION_TIME;

        // Save OTP and expiration in the database
        const userRef = db.collection('users').doc(email);
        await userRef.set({ otp, otpExpiresAt }, { merge: true });

        // Send OTP to user's email
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP are required' });
        }

        const userRef = db.collection('users').doc(email);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = userDoc.data();

        if (userData.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (userData.otpExpiresAt < Date.now()) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        // OTP is valid; generate JWT token for user
        const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

        // Clear OTP from database after successful verification
        await userRef.update({ otp: null, otpExpiresAt: null });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
