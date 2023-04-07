const router = require('express').Router();

const { getUsers, getAUser } = require('../controllers/user');

// Read
router.get('/:id', getAUser);

module.exports = router;
