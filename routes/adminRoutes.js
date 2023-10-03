const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {
  getDonorsListController,
  getHospitalsListController,
  getOrganisationsListController,
  deleteDonorController,
} = require('../controllers/adminController');

//routes
//GET OPERATION
//get donor list
router.get(
  '/donor-list',
  authMiddleware,
  adminMiddleware,
  getDonorsListController
);
//get hospital list
router.get(
  '/hospital-list',
  authMiddleware,
  adminMiddleware,
  getHospitalsListController
);
//get organisation list
router.get(
  '/organisation-list',
  authMiddleware,
  adminMiddleware,
  getOrganisationsListController
);

//DELETE OPERATION

//delete donor from list
router.delete(
  '/delete-donor/:id',
  authMiddleware,
  adminMiddleware,
  deleteDonorController
);

module.exports = router;