const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const { STATUS_CODES } = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ email, token });
      }
    })
    .catch(() => {
      res.status(STATUS_CODES.Unauthorized).send({message: "Incorrect email or password"});
    });
};

const getAUser = (req, res) => {
  const  id  = req.user._id;
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
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, avatar, email, password: hash }).then((user) => {
        res.status(STATUS_CODES.Created).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        });
      })
    )
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "Invalid data" });
      } else if (error.code === STATUS_CODES.DuplicataeEroor) {
        res
          .status(STATUS_CODES.ConflictError)
          .send({ message: "User already exit!" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "Error occured on server" });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(STATUS_CODES.NotFound)
          .send({ message: "No user with this ID found" });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "Invalid data" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "Error occured on server" });
      }
    });
};

module.exports = {
  getAUser,
  createUser,
  login,
  updateUser,
};
