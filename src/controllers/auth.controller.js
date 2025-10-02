const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcrypt");
const jsonWebToken = require("../utils/jsonWebToken");

const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  const isEmailExist = await userModel.findOne({ email });

  if (isEmailExist)
    return res.status(400).json({ message: "This email already used" });

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) return res.status(401).json({ message: "Add your password" });
    const userData = await userModel.create({
      fullName,
      email,
      password: hash,
    });

    const token = jsonWebToken(userData);
    res.cookie("token", token);

    res.status(201).json({ userData });
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userData = await userModel.findOne({ email });

  if (!userData)
    return res.status(401).json({ message: "Something is wrong!" });

  bcrypt.compare(password, userData.password, (err, result) => {
    if (!result)
      return res.status(401).json({ message: "Something is wrong!" });

    const token = jsonWebToken(userData);
    res.cookie("token", token);
    res.json({ userData });
  });
};

const userLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "cookie deleted" });
};

const foodPartnerRegister = async (req, res) => {
  const { fullName, email, password, businessName } = req.body;

  const isEmailExist = await foodPartnerModel.findOne({ email });

  if (isEmailExist)
    return res.status(400).json({ message: "This email already used" });

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) return res.status(401).json({ message: "Add your password" });
    const foodPartnerData = await foodPartnerModel.create({
      fullName,
      email,
      password: hash,
      businessName,
    });

    const token = jsonWebToken(foodPartnerData);
    res.cookie("token", token);

    res.status(201).json({ foodPartnerData });
  });
};

const foodPartnerLogin = async (req, res) => {
  const { email, password } = req.body;

  const foodPartnerData = await foodPartnerModel.findOne({ email });

  if (!foodPartnerData)
    return res.status(401).json({ message: "Something is wrong!" });

  bcrypt.compare(password, foodPartnerData.password, (err, result) => {
    if (!result)
      return res.status(401).json({ message: "Something is wrong!" });

    const token = jsonWebToken(foodPartnerData);
    res.cookie("token", token);
    res.json({ foodPartnerData });
  });
};

const foodPartnerLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "cookie deleted" });
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  foodPartnerRegister,
  foodPartnerLogin,
  foodPartnerLogout,
};
