const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(500).send({ message: "Error from getItems", err });
    });
};

const createItem = (req, res) => {
  if (!req.user || !req.user._id) {
    // handle the case where req.user is undefined or null
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid data" });
      } else {
        res.status(500).send({ message: "Server error" });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
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

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }).then(
//     (item) => {
//       res.status(200).send({ data: item });
//     }
//   )
//   .catch((err) => {
//     res.status(500).send({message: "Error from updateItem", e})
//   })
// };

const likeItem = (req, res) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "No card with this id" });
      } else {
        res.status(500).send({ message: "An error has occured on the server" });
      }
    });
};

const disLikeItem = (req, res) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "No card with this id" });
      } else {
        res.status(500).send({ message: "An error has occured on the server" });
      }
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  disLikeItem,
};
