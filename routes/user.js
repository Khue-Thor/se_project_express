const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/user');

// Read
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = router;
