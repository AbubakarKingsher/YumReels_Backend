const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {

        food: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "food"
        }],

        fullName: {
            type: String
        },

        comment: {
            type: String
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);