const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  RoomNumber: String,
  Block: String,
  PhoneNumber: Number,
  RollNumber: Number,
  Semester: Number,
  Branch: String,
  Address: String,
  Userpassword: String,
  textMessage: String,
});

module.exports = mongoose.model("users", userSchema);
