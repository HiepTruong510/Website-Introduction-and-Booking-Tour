const express = require('express');
const router =  express.Router()

const BookTour = require('../models/BookTour');
const verifyToken = require('../middleware/auth');

//----------------------------------Lấy--------------------------
// lấy thông tin một booktour
router.post('/getone', verifyToken, async(req, res) => {
    const{ idbooktour } = req.body
    try {
        const booktours = await BookTour.find({_id: idbooktour})
        res.json({success: true, message:'Get booktour success', booktours: booktours})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// lấy thông tin danh sách booktour
router.get('/getlist', verifyToken, async(req, res) => {
    try {
        const booktours = await BookTour.find().sort({ createAt: -1 }); 
        res.json({success: true, message:'Get list booktour success', booktours })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})


//----------------------------------Tạo--------------------------
//-- book một tour 
router.post('/post', verifyToken, async(req, res) => {
    const{ tourname, price,totalpeson, tourday,touryear, tourmonth, personnamebook,personemailbook,personphonebook, tour_id} = req.body
    try {
        const newBookTour =  new BookTour({
            tourname: tourname, 
            price: price, 
            totalpeson: totalpeson,
            tourday: tourday, 
            tourmonth: tourmonth , 
            touryear: touryear,
            personnamebook: personnamebook,
            personemailbook: personemailbook,
            personphonebook: personphonebook,
            tour_id: tour_id,
            user_id: req.userId 
        })

        await newBookTour.save()

        res.status(200).json({success: true, message: 'Post BookTour success', booktours: newBookTour})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

module.exports = router