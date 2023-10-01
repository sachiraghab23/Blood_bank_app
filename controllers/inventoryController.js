const inventoryModel = require("./../models/inventoryModel");
const userModel = require("./../models/userModel");

/*controller events*/
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if (inventoryType === "in" && user.role !== "donor") {
      throw new Error("Not a donor account");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
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

module.exports = { createInventoryController, getInventoryController };
