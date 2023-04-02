const ClothingItem = require("../models/clothingItem");

const getItems = (req, res, nex) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    })
}

