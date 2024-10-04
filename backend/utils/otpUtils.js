// utils/otpUtils.js
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: 'trykrtehe@gmail.com',
            // pass: 'vust xxwq gino tjjc',
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD,
        },
    });

    const mailOptions = {
        from: 'trykrtehe@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};

// Example for SMS (using Twilio)
const sendOTPSMS = async (phoneNumber, otp) => {
    const accountSid = 'your_twilio_account_sid';
    const authToken = 'your_twilio_auth_token';
    const client = twilio(accountSid, authToken);

    await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: '+1234567890', // Twilio phone number
        to: phoneNumber,
    });
};

module.exports = { generateOTP, sendOTPEmail, sendOTPSMS };
