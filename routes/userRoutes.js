const express = require("express");
const {
  registerController,
  loginController,
  currentUserController
} = require("../controllers/userController");
const userMiddleware = require("./../middlewares/userMiddleware");
const router = express.Router();

//routes
//register
router.post("/register", registerController);
//login
router.post("/login", loginController);
//get current-user
router.get("/current-user", userMiddleware, currentUserController);
module.exports = router;
