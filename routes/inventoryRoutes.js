const express = require("express");
const authMiddleware = require("../middlewares/userMiddleware");
const {
  createInventoryController, getInventoryController,
} = require("../controllers/inventoryController");
const router = express.Router();

//routes
//ADD inventory
router.post("/create-inventory", authMiddleware, createInventoryController);
//GET inventories
router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
