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

app.use('/api/v1/test',require('./routes/testRoutes'));
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

app.listen(PORT, () => {
  console.log(`Server running successfully in ${process.env.DEV_MODE} mode on port ${PORT}`);
});