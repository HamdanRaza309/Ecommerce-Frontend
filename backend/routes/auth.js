const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET || 'hamdanhrhd';

// ROUTE 1: Create a new user using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Email already in use. Please use a different email." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Default to 'user' role or set to 'admin' if the specific email is provided
        const role = req.body.email === 'fashioncloset@admin.com' ? 'admin' : 'user';

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: role // Set the role based on email
        });

        const data = {
            user: { id: user.id, role: user.role, name: user.name }
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken, role: user.role, name: user.name, id: user._id });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ success, error: 'Internal Server Error. Please try again later.' });
    }
});

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required.
router.post('/login', [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password cannot be empty').exists(),
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success, error: 'Invalid email or password.' });
        }

        const data = {
            user: { id: user.id, role: user.role, name: user.name }
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken, role: user.role, name: user.name });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ success, error: 'Internal Server Error. Please try again later.' });
    }
});

// ROUTE 3: Get logged-in user details using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
});

module.exports = router;
