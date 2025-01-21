const mongoose = require("mongoose");
require("dotenv").config(); 

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  if (!uri) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
