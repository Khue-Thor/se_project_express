const mongoose = require("mongoose");
const validator = require("validator");

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
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  }
})

module.exports = mongoose.model("user", userSchema);