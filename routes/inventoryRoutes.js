const express = require("express");
const authMiddleware = require("../middlewares/userMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganisationController,
  getOrgForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController
} = require("../controllers/inventoryController");
const router = express.Router();

//routes
//ADD inventory
router.post("/create-inventory", authMiddleware, createInventoryController);
//GET all blood records
router.get("/get-inventory", authMiddleware, getInventoryController);
//GET recent blood records
router.get("/get-recent-inventory", authMiddleware, getRecentInventoryController);
//GET donor records
router.get("/get-donors", authMiddleware, getDonorsController);
//GET hospital records
router.get('/get-hospitals', authMiddleware, getHospitalController);
//GET organisation records
router.get('/get-organisations', authMiddleware, getOrganisationController);
//GET organisation records for hospitals
router.get('/get-organisations-for-hospital', authMiddleware, getOrgForHospitalController);
//GET all blood records
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController);

module.exports = router;
