const router = require('express').Router();

const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require('../controllers/clothingItem');

// Read
router.get('/', getItems);

// Create
router.post('/', auth, createItem);

// Delete
router.delete('/:id', auth, deleteItem);

// Like
router.put('/:id/likes', auth, likeItem);

// Dislike
router.delete('/:id/likes', auth, disLikeItem);

module.exports = router;
