const express = require('express');
const router =  express.Router()

const Contact = require('../models/Contact');
const verifyToken = require('../middleware/auth');

//----------------------------------Lấy------------------------
//-- admin lấy một contact
router.post('/getone', verifyToken, async(req, res) => {
    const { idcontact } = req.body
    try {
        const contacts = await Contact.find({_id: idcontact })
        res.json({success: true, message:"get list contacts success", contacts })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})
//-- admin lấy danh sách contact
router.get('/getlist', verifyToken, async(req, res) => {
    try {
        const contacts = await Contact.find().sort({ createAt: -1 });
        res.json({success: true, message:"get list contacts success", contacts })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

//----------------------------------Tạo--------------------------
//-- người dùng tạo ra contact
router.post('/post', verifyToken, async(req, res) => {
    const{fullname, phonenumber, email,address, message} = req.body
    try {
        const newContact =  new Contact({
            fullname: fullname, 
            phonenumber: phonenumber, 
            email: email || "", 
            address: address || "",
            message: message || "",
            user: req.userId 
        })
        await newContact.save()
        res.status(200).json({success: true, message: 'Post Info success', contacts: newContact})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})


module.exports = router