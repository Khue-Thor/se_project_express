const ClothingItem = require("../models/clothingItem");

const { STATUS_CODES } = require("../utils/errors");

const NotFoundError = require("../utils/errors/notfound");

const BadRequestError = require("../utils/errors/badrequest");

const ForBiddenError = require("../utils/errors/forbidden");

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
        next(err);
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
      return next(new ForBiddenError("Forbidden"));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid Id"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err)
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
        throw new NotFoundError("Card Not Found");
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid Id"));
      } else {
        next(err);
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
        throw new NotFoundError('Cart Not Found')
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid Id"));
      } else {
        next(err);
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
