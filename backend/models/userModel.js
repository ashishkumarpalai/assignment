const db = require('../config/firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = db.collection('users');

// Register a new user
const registerUser = async (userData) => {
    try {
        const { email, password, username } = userData;

        // Check if user already exists
        const userSnapshot = await Users.where('email', '==', email).get();
        if (!userSnapshot.empty) {
            throw new Error('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to database
        const newUser = {
            email,
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        const userRef = await Users.add(newUser);
        return { id: userRef.id, email, username };
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

// Login user
const loginUser = async (email, password) => {
    try {
        const userSnapshot = await Users.where('email', '==', email).get();

        if (userSnapshot.empty) {
            throw new Error('User not found');
        }

        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ id: userDoc.id, email: user.email }, 'secretkey', { expiresIn: '1h' });
        return { token, user: { id: userDoc.id, email: user.email, username: user.username } };
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
};

module.exports = {
    registerUser,
    loginUser
};
