const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(500).send({ message: "Error from getItems", err });
    });
};

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  // const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid data" });
      }
    });
};

const deleteItem = (req, res) => {
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
        res.status(400).send({ message: "Invalid Id" });
      }
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }).then(
    (item) => {
      res.status(200).send({ data: item });
    }
  )
  .catch((err) => {
    res.status(500).send({message: "Error from updateItem", e})
  })
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  updateItem,
};
