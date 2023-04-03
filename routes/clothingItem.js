const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
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
router.put('/:id', likeItem)

module.exports = router;
