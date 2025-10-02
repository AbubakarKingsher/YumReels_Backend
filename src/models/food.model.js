const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    video: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],

}, { timestamps: true })

module.exports = mongoose.model("food", foodSchema);