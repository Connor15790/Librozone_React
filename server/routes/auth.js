const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require("bcryptjs");
const fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT;

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check whether the user with this username already exists
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).send("Sorry, a user with this username already exists.")
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newUser = new User({ username: username, password: secPass });
        await newUser.save();

        const data = {
            user: {
                id: newUser.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);

        res.status(200).json({ newUser, token: authToken, success: "User registered successfully!" });

        // res.status(201).send('User registered successsfully!');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

router.post('/login', async (req, res) => {
    let success = false;

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("Please enter the correct credentials.");
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).send("Please enter the correct credentials.");
        }

        success = true;

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        
        res.status(200).json({ user, token: authToken, success: "User login successfull!" });
        // res.status(200).send('Login successful');
        // res.json({success});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});

module.exports = router;