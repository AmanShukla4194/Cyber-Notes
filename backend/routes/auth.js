const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Simply Marvellous";
const fetchuser = require("../middleware/fetchuser");

// Route 1 : Create a user using: POST "api/auth/createuser" - Doesn't require Authentication

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters ').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check whether the user with this exixts already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry user with this email aldreay exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: 'Please enter a valid email address', message: err.message })
        // })

        const data = {
            user: {
                id: user.id  // using the authtoken this payload data can be retrieved
            }  // and using our jwt sign secret we can identify that this is the same data which was used to authenticate with our web app before
        }
        // authtoken is a token which we return to user after the first time authentication 
        // so that we can match the user with that authtoken when the user comes with a protected route
        // THIS IS A JWT TOKEN, IT HAS THREE PARTS :
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c 

        // 1. First is alogorithm and type of the JWT here type as "JWT"
        // 2. Second is the payload data part which we want to give here it as a unique id for each user
        // 3. Third is our verified signature which we use to identify the already authenticated user even if the payload data is changed

        // adding our secret line for our web app with a unique data of our user as user's id
        // signing our authtoken with our own secret line of our web app

        const authToken = jwt.sign(data, JWT_SECRET);

        // res.json(user);
        res.json({ success: true, authToken });
    }
    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error");
    }

})

// Route 2: Authenticate a user using: POST "api/auth/login" - No Login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Please use correct credentials to login" });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({success, error: "Please use correct credentials to login" });
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3: Get Loggedin user details using: POST "api/auth/getUser" - Login required

router.post('/getUser', fetchuser, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;