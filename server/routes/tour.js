const express = require("express");
const router = express.Router();

const Tour = require("../models/Tour");
const verifyToken = require("../middleware/auth");

//----------------------------------Lấy--------------------------
// lấy thông tin một tour
router.post("/get", verifyToken, async (req, res) => {
    const { tourname } = req.body;
    try {
        const tours = await Tour.find({ tourname: tourname });
        res.json({ success: true, message: "Get Info tour success", tours });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// lấy danh sách tour
router.get("/list", verifyToken, async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json({ success: true, message: "Success", tours });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//------------------------------Tạo-----------------
// tạo một tour
router.post("/post", verifyToken, async (req, res) => {
    const { tourname, price_G, price_B, pic, pic1, pic2, pic3, pic4, intro } =
        req.body;
    try {
        const newTour = new Tour({
            tourname: tourname,
            price_G: price_G,
            price_B: price_B,
            pic: pic,
            pic1: pic1,
            pic2: pic2,
            pic3: pic3,
            pic4: pic4,
            intro: intro,
        });
        await newTour.save();
        res.status(400).json({
            success: true,
            message: "Post Tour success",
            tours: newTour,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//----------------------------------Sửa-----------------------------
//admin sửa
router.put("/put", verifyToken, async (req, res) => {
    const { tourname, price_G, price_B, pic, pic1, pic2, pic3, pic4, intro } =
        req.body;
    try {
        let updatedTour = {
            price_G: price_G,
            price_B: price_B,
            pic: pic,
            pic1: pic1,
            pic2: pic2,
            pic3: pic3,
            pic4: pic4,
            intro: intro,
        };
        const tourUpdateCondition = { tourname: tourname };
        updatedTour = await Tour.findOneAndUpdate(
            tourUpdateCondition,
            updatedTour,
            { new: true }
        );
        //user not authorised to update info
        if (!updatedTour)
            return res.status(401).json({
                success: false,
                message: "Tour not found or user not authorised",
            });
        res.json({
            success: true,
            message: "Put Tour success!",
            tours: updatedTour,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Error",
            });
        }
        Object.values(req.body).forEach((element) => {
            if (typeof element !== "string") {
                return res.status(404).json({
                    success: false,
                    message: "Sai kiểu dữ",
                });
            }
        });

        let updateTour = {
            tourname: req.body.tourname,
            price_B: req.body.price_B,
            price_G: req.body.price_G,
            intro: req.body.intro,
        };

        updateTour = await Tour.findByIdAndUpdate({ _id: id }, updateTour, {
            new: true,
        });

        if (!updateTour)
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Tour not found or user not authorised",
                });
        return res.json({
            success: true,
            message: "Put Tour success!",
            tour: updateTour,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//----------------------------------Xóa-----------------------------
//admin xóa tour
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTour = await Tour.deleteOne({ _id: id });
        console.log(deleteTour);
        return res.status(200).json({
            success: true,
            message: "Tour deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
module.exports = router;
