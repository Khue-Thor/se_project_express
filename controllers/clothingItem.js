const ClothingItem = require("../models/clothingItem");

const { STATUS_CODES } = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => {
      res.status(STATUS_CODES.ServerError).send({ message: "Error from getItems"});
    });
};

const createItem = (req, res) => {

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
  const { id } = req.params;
  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if(item.owner.equals(req.user._id)) {
        return item.deleteOne(() => res.send({ClothingItem: item}));
      }
      return res.status(STATUS_CODES.Forbidden).send({message: "Forbidden"});
    })
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
        res
          .status(STATUS_CODES.BadRequest)
          .send({ message: "Invalid Id" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "An error has occured on the server" });
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
        res
          .status(STATUS_CODES.BadRequest)
          .send({ message: "Invalid Id" });
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "An error has occured on the server" });
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
