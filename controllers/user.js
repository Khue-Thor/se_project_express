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
    if(!user) {
      res.send({ message: "Requested resource not found"});
    }
    res.send({
      data: user,
    })
  })
  .catch((err) => res.status(500).send({ message: err.message }));
  next();
}







module.exports = {
getUsers,
getUser,
}