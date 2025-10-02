const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodPartner.model");
const commentModel = require("../models/comment.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  const { name, description } = req.body;

  const fileUploadResult = await uploadFile(req.file.buffer, uuid());

  const foodCreated = await foodModel.create({
    name: name,
    description: description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner,
  });

  const foodPartnerData = await foodPartnerModel.findOne({ _id: req.foodPartner.id })

  foodPartnerData.posts.push(foodCreated.id)
  await foodPartnerData.save()

  res.status(201).json({ message: "Fooditem created successfully" });

};

const getFoodItems = async (req, res) => {
  const foodItems = await foodModel.find()

  res
    .status(200)
    .json(foodItems);
};

const addLikes = async (req, res) => {

  const foodData = await foodModel.findOne({ _id: req.params.id })

  const alreadyLiked = foodData.likes.some(id => id == req.user.id)

  if (!alreadyLiked) {
    foodData.likes.push(req.user.id)
    await foodData.save()
  } else {
    foodData.likes = foodData.likes.filter(id => id != req.user.id);
    await foodData.save()
  }

  res.json(foodData)
}

const addBookmarks = async (req, res) => {

  const foodData = await foodModel.findOne({ _id: req.params.id })

  const alreadyBookmarked = foodData.bookmarks.some(id => id == req.user.id)

  if (!alreadyBookmarked) {
    foodData.bookmarks.push(req.user.id)
    await foodData.save()
  } else {
    foodData.bookmarks = foodData.bookmarks.filter(id => id != req.user.id);
    await foodData.save()
  }

  res.json(foodData)
}

const addComments = async (req, res) => {

  const { comment } = req.body

  const commentData = await commentModel.create({
    comment,
    fullName: req.user.fullName
  })

  const foodData = await foodModel.findOne({ _id: req.params.id })

  foodData.comments.push(commentData._id)
  await foodData.save()


  res.status(200).json({ message: "Successfully commented" })

}

const getComments = async (req, res) => {

  const foodData = await foodModel.findOne({ _id: req.params.id }).populate("comments")

  res.status(200).json(foodData.comments)

}

module.exports = { createFood, getFoodItems, addLikes, addBookmarks, addComments, getComments };