const router = require("express").Router();

const { createItem, getItems, updateItem } = require("../controllers/clothingItem");

// CRUD

// Read
router.get('/', getItems)

//Create
router.post('/', createItem);

// Delete


// Update
router.put('/:itemId', updateItem)


module.exports = router;