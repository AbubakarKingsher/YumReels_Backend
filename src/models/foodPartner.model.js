const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    description: {
      type: String
    },

    picture: {
      type: String
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
      }
    ]

  },
  { timestamps: true }
);

module.exports = mongoose.model("foodPartner", foodPartnerSchema);
