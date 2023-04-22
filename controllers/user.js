const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const { STATUS_CODES } = require("../utils/errors");

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require("../utils/errors/unauthorized");

const NotFoundError = require("../utils/errors/notfound");

const ConflictError = require("../utils/errors/conflict");

const BadRequestError = require("../utils/errors/badrequest");

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id },  NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ email, token });
      }
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw NotFoundError("User not found");
      }
      res.send({
        data: user,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
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
        next(new BadRequestError("Invalid data"));
      } else if (error.code === STATUS_CODES.DuplicataeEroor) {
        next(new ConflictError("User already exist"));
      } else {
        next(error);
      }
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw NotFoundError("No user with this ID found");
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "Error occured on server" });
      }
    });
};

module.exports = {
  login,
  getUser,
  createUser,
  updateUser,
};
