
const express = require('express');
const router =  express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
let dem = 0
let now = new Date();
let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

//---------------------------------Register-------------------------
//router.get('/', (req, res) => res.send('USER ROUTE'))
// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const {username, password} = req.body

    // simple validation
    if(!username || !password)
    {
        return res
        .status(400)
        .json({success: false, message: 'Missing username and/or passsword'})
    }
    try 
    {
        // check for exting user
        const user = await User.findOne({ username })
        if (user)
            return res
            .status(400)
            .json({success: false, message: 'username already taken '})
        // all goood
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword})
        await newUser.save()
        // Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true, 
            message: 'User created successfully', 
            accessToken
        })
    } 
    catch (error) 
    {
        console.log(error)
        res
        .status(500)
        .json({success: false, message: 'Internal server error'})
    }
})

//---------------------------------------Login---------------------------------
// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) => {
    const {username, password} = req.body
    let now1 = Date.now();
    let diffSeconds = Math.abs(now1 - start) / 1000;
    if(diffSeconds <= 30 )
    {
        return res
        .status(401)
        .json({success: false, message: 'Wait ' + Math.floor(30 - diffSeconds) + ' seconds to perform login!!'})
    }
    // simple validation
    if(!username || !password)
    {
        return res
        .status(400)
        .json({success: false, message: 'Missing username and/or passsword'})
    }
    try {
        // check for exting user
        const user = await User.findOne({username})
        //check username
        if (!user)
        {
            dem = dem + 1
            if(dem > 3)
            {
                start = Date.now()
                dem = 0
                return res
                .status(401)
                .json({success: false, message: '1 Wait 30 seconds to perform login!!'})
            }
            return res
            .status(400)
            .json({success: false, message: 'Login Fail '})
        }
        // check pass
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
        {
            dem = dem + 1
            if(dem > 3)
            {
                start = Date.now()
                dem = 0
                return res
                .status(401)
                .json({success: false, message: '2 Wait 30 seconds to perform login!!'})
            }
            return res
            .status(400)
            .json({success: false, message: 'Login Fail pass'})
        } 
        // Return token
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        dem = 0
        res.json({
            success: true, 
            message: 'User login successfully', 
            accessToken
        })
    }
    catch (error){
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

 module.exports = router