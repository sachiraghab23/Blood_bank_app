const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

//rest object
const app = express();

//port
const PORT = process.env.PORT || 8080;

// database connection
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server running successfully in ${process.env.DEV_MODE} mode on port ${PORT}`);
});