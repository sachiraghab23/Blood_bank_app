const userModel = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exists",
      });
    }
    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).send({
      success: true,
      messsage: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};
module.exports = { registerController, loginController };
