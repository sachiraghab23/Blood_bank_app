const testController = (req, res) => {
  res.status(200).json({
    message: "Test successful",
    success: true,
  });
};

module.exports = { testController };