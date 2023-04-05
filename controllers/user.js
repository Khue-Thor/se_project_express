const User = require("../models/user");

const { STATUS_CODES } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_CODES.Ok).send({ data: users });
    })
    .catch((err) => {
      res
        .status(STATUS_CODES.ServerError)
        .send({ message: "Error occured on server", err });
    });
};

const getAUser = (req, res) => {
  const { id }= req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res
          .status(STATUS_CODES.NotFound)
          .send({ message: "User not found" });
      }
      return res.send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(STATUS_CODES.NotFound).send({ message: "Invalid Id" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "Error occured on server" });
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
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "Error occured on server" });
      }
    });
};

module.exports = {
  getUsers,
  getAUser,
  createUser,
};
