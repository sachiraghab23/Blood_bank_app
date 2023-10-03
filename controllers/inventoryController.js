const mongoose = require("mongoose");
const inventoryModel = require("./../models/inventoryModel");
const userModel = require("../models/userModel");

/*controller events*/
//add blood record inventory
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if (req.body.inventoryType === 'out') {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculating in blood quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: 'in',
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: '$bloodGroup',
            total: { $sum: '$quantity' }
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0
      //calculating total out blood quantity
      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: 'out',
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: '$bloodGroup',
            total: { $sum: '$quantity' },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0
      //in & out calculation
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }
    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventory API",
      error,
    });
  }
};

//get all blood records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all Inventory",
      error,
    });
  }
};

//get blood record of 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find({
      organisation: req.body.userId
    }).limit(3).sort({ createdAt: -1 })
    return res.status(200).send({
      success: true,
      message: 'Recent inventory datas fetched',
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Recent Inventory API',
      error,
    })
  }
};

//get donor records
const getDonorsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donorId = await inventoryModel.distinct('donor', {
      organisation,
    });
    const donors = await userModel.find({ _id: { $in: donorId } });
    return res.status(200).send({
      success: true,
      message: 'Donor record fetched successfully',
      donors
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in donor records',
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const hospitalId = await inventoryModel.distinct('hospital', { organisation, })
    const hospitals = await userModel.find({
      _id: { $in: hospitalId }
    });
    return res.status(200).send({
      success: true,
      message: 'Hospital records fetched successfully',
      hospitals
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in get hospital API',
      error
    })
  }
};

const getOrganisationController = async (req, res) => {
  try {
    const donor = req.body.userId;
    const orgId = await inventoryModel.distinct('organisation', { donor })
    const organisations = await userModel.find({
      _id: { $in: orgId }
    });
    return res.status(200).send({
      success: true,
      message: 'ORG records fetched successfully',
      organisations
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in get organisation API',
      error
    })
  }
};

//get orgs for hospitals
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct('organisation', { hospital })
    const organisations = await userModel.find({
      _id: { $in: orgId }
    });
    return res.status(200).send({
      success: true,
      message: ' Hospital Org data fetched successfully',
      organisations,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in hospital Org API',
      error
    })
  }
};

//get hospitals blood records
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get hospital consumer inventories",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
