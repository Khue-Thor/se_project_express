const router = require('express').Router();

const { getAUser } = require('../controllers/user');

const auth = require("../middlewares/auth");

// Read
router.get('/:id', auth, getAUser);

module.exports = router;
