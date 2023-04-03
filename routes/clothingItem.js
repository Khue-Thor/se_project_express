const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem
} = require("../controllers/clothingItem");

// CRUD

// Read
router.get("/", getItems);

//Create
router.post("/", createItem);

// Delete
router.delete("/:itemId", deleteItem);

// Update
// router.put("/:itemId", updateItem);

// Like
router.put('/:id/likes', likeItem);

// Dislike
router.delete('/:id/likes', disLikeItem);

module.exports = router;
