const mongoose = require("mongoose");
const inventoryModel = require('./../models/inventoryModel');
//get blood group data
const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    //get single blood group
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        //CALCULATE TOTAL IN
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organisation,
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }
            }
          }
        ]);
        //CALCULATE TOTAL OUT
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organisation,
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }
            }
          }
        ]);
        //CALCULATE TOTAL
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
        //push data
        bloodGroup.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );
    return res.status(200).send({
      success: true,
      message: 'Blood group data fetched successfully',
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in blood group data analytics API',
      error,
    });
  }
};

module.exports = { bloodGroupDetailsController };