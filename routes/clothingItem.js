const router = require("express").Router();

const { createItem } = require("../controllers/clothingItem");

// CRUD

//Create
router.post('/', createItem);

module.exports = router;