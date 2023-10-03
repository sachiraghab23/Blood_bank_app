const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/userMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {
  getDonorsListController,
  getHospitalsListController,
  getOrganisationsListController,
  deleteDonorController,
  deleteHospitalController,
  deleteOrganisationController
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

//delete hospital from list
router.delete(
  '/delete-hospital/:id',
  authMiddleware,
  adminMiddleware,
  deleteHospitalController
);

//delete organisation from list
router.delete(
  '/delete-organisation/:id',
  authMiddleware,
  adminMiddleware,
  deleteOrganisationController
);

module.exports = router;