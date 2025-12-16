const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register User
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // Default to user if not specified
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// 2. Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        // Compare password (entered vs hashed)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};