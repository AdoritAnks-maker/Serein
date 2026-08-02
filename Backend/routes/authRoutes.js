const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ==================== SIGNUP ====================

router.post("/signup", async (req, res) => {

    try {

        console.log("Signup Request:", req.body);

        const {
            username,
            email,
            password,
            bio
        } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }

        // Check existing user
        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashPassword,
            bio
        });

        res.status(201).json({
            message: "Account Created Successfully",
            userId: user._id
        });

    } catch (err) {

        console.log("Signup Error:", err);

        res.status(500).json({
            message: err.message
        });

    }

});


// ==================== LOGIN ====================

router.post("/login", async (req, res) => {

    try {

        console.log("Login Request:", req.body);

        const {
            email,
            password
        } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            userId: user._id
        });

    } catch (err) {

        console.log("Login Error:", err);

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;