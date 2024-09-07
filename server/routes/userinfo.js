const express = require('express');
const router =  express.Router()

const Userinfo = require('../models/Userinfo');
const verifyToken = require('../middleware/auth');

//-------------------------------Lấy-----------------------------
// tự xem thông tin cá nhân
router.get('/get', verifyToken, async(req, res) => {
    try {
        const infos = await Userinfo.find({ user: req.userId }).populate('user',['username']) 
        res.json({success: true, message:"get info person success", infos })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

//----------------------------------Tạo--------------------------
// người dùng tự tạo thông tin
router.post('/post', verifyToken, async(req, res) => {
    const{ permission, fullname, phonenumber, email,address} = req.body
    try {
        const newUserinfo =  new Userinfo({
            permission: permission || "nhanvien", 
            fullname: fullname, 
            phonenumber: phonenumber, 
            email: email || '', 
            address: address || '',
            user: req.userId 
        })
        await newUserinfo.save()
        res.status(200).json({success: true, message: 'Post Info success', infos: newUserinfo})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

//----------------------------------PUT-----------------------------
// người dùng sửa thông tin cá nhân
router.put('/put', verifyToken, async(req, res) => {
    const{ fullname, phonenumber, email, address} = req.body
    //Simple validation
    try {
        let updatedUserInfo =  {
            fullname: fullname, 
            phonenumber: phonenumber, 
            email: email || '', 
            address: address || ''
        }
       const  infoUpdateCondition = { user: req.userId}
       updatedUserInfo = await Userinfo.findOneAndUpdate(infoUpdateCondition,updatedUserInfo, {new: true})
        //user not authorised to update info 
        if(!updatedUserInfo)
            return res.status(401).json({success: false, message: 'Info not found or user not authorised'})
        res.json({success: true, message: 'Put Info success!', userinfos: updatedUserInfo})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})


module.exports = router