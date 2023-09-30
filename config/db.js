const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongodb database error: ${error}`);
  }
};
module.exports = connectDB;