const mongoose = require("mongoose");
const inventoryModel = require("./../models/inventoryModel");
const userModel = require("./../models/userModel");

/*controller events*/
const createInventoryController = async (req, res) => {
  try {
    const { email, bloodGroup, quantity } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if (inventoryType === "in" && user.role !== "donor") {
    //   throw new Error("Not a donor account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }
    if (req.body.inventoryType === 'out') {
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculating in blood quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: 'in',
            bloodGroup
          }
        }, {
          $group: {
            _id: '$bloodGroup',
            total: { $sum: '$quantity' }
          }
        }
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0
      //calculating total out blood quantity
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: 'out',
            bloodGroup,
          }
        },
        {
          $group: {
            _id: '$bloodGroup',
            total: { $sum: '$quantity' }
          }
        }
      ]);
      const totalOut = totalOutOfRequestedBloodGroup || 0

      //in & out calculation
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuantityOfBloodGroup < quantity) {
        return res.status(500).send({
          success: false,
          message:`Only ${availableQuantityOfBloodGroup}ML of ${bloodGroup.toUpperCase()} is available`
        })
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

const getInventoryController = async (req, res) => {
  try {
    const inventories = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventories",
      error,
    });
  }
};

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
    const donor = req.body.userId;
    const hospitalId = await inventoryModel.distinct('hospital', { donor })
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
const getOrgForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct('organisation', { hospital })
    const organisations = await userModel.find({
      _id: { $in: orgId }
    });
    return res.status(200).send({
      success: true,
      message: ' Hospital Org data fetched successfully',
      organisations
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
  getOrgForHospitalController,
  getInventoryHospitalController,
};
