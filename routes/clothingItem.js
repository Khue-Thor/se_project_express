const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItem");

// CRUD

// Read
router.get("/", getItems);

//Create
router.post("/", createItem);

// Delete
router.delete("/:itemId", deleteItem);

// Update
router.put("/:itemId", updateItem);

module.exports = router;
