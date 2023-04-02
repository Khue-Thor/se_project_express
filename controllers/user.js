const User = require("../models/user");

const getUsers = (req, res) => {
  User.fing({})
    .then((users) => {
      if (!users) {
        res.send({ message: "Requested resource not found" });
      }
      res.send({
        data: users,
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.send({ message: "Requested resource not found" });
      }
      res.send({
        data: user,
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
  next();
};

const createUser = (req, res) => {
  const {name, avatar} = req.body;

  User.create({name, avatar})
    .then((user) => {
      res.send({ name: user.name, avatar: user.avatar})
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
