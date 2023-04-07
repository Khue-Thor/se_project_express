const router = require('express').Router();

const { getAUser, updateUser } = require('../controllers/user');

const auth = require("../middlewares/auth");

// Read
router.get('/me', auth, getAUser);
router.patch('/me', auth, updateUser);

module.exports = router;
