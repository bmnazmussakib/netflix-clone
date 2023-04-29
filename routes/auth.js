const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");


// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY,).toString()
    })

    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


// Login
router.post("/login", async (req, res) => {
    try {
        // Check email
        const user = await User.findOne({ email: req.body.email })

        // Check email
        !user && res.status(401).json("❌Email or Password is not match❌")

        // Check password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        console.log('Password:', originalPassword);

        originalPassword != req.body.password && res.status(401).json("❌Email or Password is not match❌")

        // user && originalPassword === req.body.password && 
        res.status(200).json(user)

        

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router