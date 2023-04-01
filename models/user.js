const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
    default: "Elise",
  },
  avatar: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model("user", userSchema);