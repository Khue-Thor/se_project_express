const ClothingItem = require("../models/clothingItem");

const getItems = (req, res, nex) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    })
}

const createItem = (req, res, next) => {
  const userId = req.user._id;

  const {name, weather, imageUrl} = req.body;

  ClothingItem.create({name, weather, imageUrl, owner: userId})
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if(err.name === "ValidationError") {
        res.status(401).send({ message: "Invalid Data"})
      } else {
        next(err)
      }
    })
}