const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodPartner.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid")

const foodPartnerProfile = async (req, res) => {
    const foodPartnerData = await foodPartnerModel.findOne({ _id: req.foodPartner.id }).populate("posts")

    res.json(foodPartnerData)
}

const editProfile = async (req, res) => {
    try {
        const { fullName, businessName, description } = req.body;

        let pictureUrl = req.foodPartner.picture;

        if (req.file) {
            const fileUploadResult = await uploadFile(req.file.buffer, uuid());
            pictureUrl = fileUploadResult.url;
        }

        const foodPartnerData = await foodPartnerModel.findByIdAndUpdate(
            req.foodPartner._id,
            { fullName, businessName, description, picture: pictureUrl },
            { new: true }
        );

        res.status(200).json(foodPartnerData);
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
};

const foodPartnerPosts = async (req, res) => {

    const foodPartnerData = await foodPartnerModel.findOne({ _id: req.params.id }).populate("posts")

    res.json(foodPartnerData)

}


module.exports = {
    foodPartnerProfile,
    editProfile,
    foodPartnerPosts
}