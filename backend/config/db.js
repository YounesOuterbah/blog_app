const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB on ${process.env.MONGO_URI}`.red.underline);
  } catch (error) {
    console.log("Connection Failed To MongoDB", error);
  }
};

module.exports = connectDB;
