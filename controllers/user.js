const User = require("../models/user");
const { STATUS_CODES } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        res.status(STATUS_CODES.NotFound).send({ message: "Users not found" });
      }
      res.send({
        data: users,
      });
    })
    .catch((err) => {
      if(err.name === "CastError") {
        res
        .status(STATUS_CODES.NotFound)
        .send({ message: "Users not found!" });
      } else {
        res
        .status(STATUS_CODES.ServerError)
        .send({ message: "Error occured on server" })
      }
    });
};

const getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res
          .status(STATUS_CODES.NotFound)
          .send({ message: "User not found" });
      }
      res.send({
        data: user,
      });
    })
    .catch((err) => {
      if(err.name === "CastError") {
        res
        .status(STATUS_CODES.NotFound)
        .send({ message: "Users not found!" });
      } else {
        res
        .status(STATUS_CODES.ServerError)
        .send({ message: "Error occured on server" })
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ name: user.name, avatar: user.avatar });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "Invalid data" });
      } else if (error.code === STATUS_CODES.DuplicateError) {
        res
          .status(STATUS_CODES.Conflict)
          .send({ message: "User already exists! " });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
