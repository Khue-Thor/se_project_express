const ClothingItem = require("../models/clothingItem");
const {STATUS_CODES} = require("../utils/errors")


const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(STATUS_CODES.Ok).send(items))
    .catch((err) => {
      res.status(500).send({ message: "Error from getItems", err });
    });
};

const createItem = (req, res) => {
  if (!req.user || !req.user._id) {
    // handle the case where req.user is undefined or null
    res.status(STATUS_CODES.Unauthorized).send({ message: "Unauthorized" });
    return;
  }

  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: userId,
  })
    .then((item) => {
      res.status(STATUS_CODES.Created).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "Invalid data" });
      } else {
        res.status(STATUS_CODES.ServerError).send({ message: "Server error" });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(STATUS_CODES.NoContent).send({item}))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "Invalid Id" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(STATUS_CODES.NotFound).send({ message: "Item not found" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const likeItem = (req, res) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODES.NotFound).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "No card with this id" });
      } else {
        res.status(STATUS_CODES.ServerError).send({ message: "An error has occured on the server" });
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
        res.status(STATUS_CODES.NotFound).send({ message: "Card not found" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(STATUS_CODES.BadRequest).send({ message: "No card with this id" });
      } else {
        res.status(STATUS_CODES.ServerError).send({ message: "An error has occured on the server" });
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
