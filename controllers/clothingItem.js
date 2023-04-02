const ClothingItem = require("../models/clothingItem");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });
};

const createItem = (req, res, next) => {
  const userId = req.user._id;

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(401).send({ message: "Requested resource not found" });
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if (item.owner.equal(req.user._id)) {
        return item.deleteOne(() => res.send({ clothingItem: item }));
      }
      return res.status(403).send({ message: "Forbidden" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(401).send({ message: "Requested resource not found" });
      }
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
