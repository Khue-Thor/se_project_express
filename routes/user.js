const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/user');

const auth = require("../middlewares/auth");

// Read
router.get('/me', auth, getUser);
router.patch('/me', auth, updateUser);

module.exports = router;
