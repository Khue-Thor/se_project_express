const router = require('express').Router();

const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require('../controllers/clothingItem');

// CRUD

// Read
router.get('/', auth, getItems);

// Create
router.post('/', auth, createItem);

// Delete
router.delete('/:id', deleteItem);

// Like
router.put('/:id/likes', likeItem);

// Dislike
router.delete('/:id/likes', disLikeItem);

module.exports = router;
