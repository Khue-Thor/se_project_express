const router = require("express").Router();

const auth = require("../middlewares/auth");

const { validateCardBody, validateIds } = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItem");

// Read
router.get("/", getItems);

// Create
router.post("/", auth, validateCardBody, createItem);

// Delete
router.delete("/:id", auth, validateIds, deleteItem);

// Like
router.put("/:id/likes", auth, validateIds, likeItem);

// Dislike
router.delete("/:id/likes", auth, validateIds, disLikeItem);

module.exports = router;
