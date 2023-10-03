const userModel = require('./../models/userModel');
const getDonorsListController = async (req, res) => {
  try {
    const donorData = await userModel.find({ role: 'donor' }).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: donorData.length,
      message: 'Donor list fetched successfully',
      donorData
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in donor list API',
      error,
    });
  }
};

const getHospitalsListController = async (req, res) => {
  try {
    const hospitalData = await userModel.find({ role: 'hospital' }).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: hospitalData.length,
      message: 'Hospital list fetched successfully',
      hospitalData
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in hospital list API',
      error,
    });
  }
};

const getOrganisationsListController = async (req, res) => {
  try {
    const organisationData = await userModel.find({ role: 'organisation' }).sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: organisationData.length,
      message: 'Organisation list fetched successfully',
      organisationData
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in organisation list API',
      error,
    });
  }
};

const deleteDonorController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: 'Donor record deleted successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error while deleting donor',
      error,
    });
  }
};

const deleteHospitalController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: 'Hospital record deleted successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error while deleting hospital',
      error,
    });
  }
};

const deleteOrganisationController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: 'Organisation record deleted successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error while deleting organisation',
      error,
    });
  }
};

module.exports = {
  getDonorsListController,
  getHospitalsListController,
  getOrganisationsListController,
  deleteDonorController,
  deleteHospitalController,
  deleteOrganisationController
};