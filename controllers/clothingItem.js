const ClothingItem = require("../models/clothingItem");

const { STATUS_CODES } = require("../utils/errors");

const {
  NotFoundError,
  BadRequestError,
  ForBiddenError,
} = require("../utils/errors");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      next(err);
    });
};

const createItem = (req, res, next) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: userId,
  })
    .then((item) => {
      res.status(STATUS_CODES.Created).send({ item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err)
      }
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;
  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne().then(() => res.send({ ClothingItem: item }));
      }
      return next(new ForBiddenError("Forbidden"))
    })
    .catch((err) => {
      if (err.name === "CastError") {
       next(new BadRequestError("Invalid Id"))
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError('Item not found'))
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const likeItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
       throw new NotFoundError("Card Not Found")
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid Id"))
      } else {
        res
          .status(STATUS_CODES.ServerError)
          .send({ message: "An error has occured on the server" });
      }
    });
};

const disLikeItem = (req, res, next) => {
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
        next(new BadRequestError("Invalid Id"))
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
