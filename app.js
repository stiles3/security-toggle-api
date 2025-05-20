const express = require("express");
const appRoutes = require("./src/modules/app/app.route");
const errorHandler = require("./src/middleware/error");
const cors = require("cors");

// Load env vars
require("dotenv").config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/app", appRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5011;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
