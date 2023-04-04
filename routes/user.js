const router = require('express').Router();

const { getUsers, getAUser, createUser } = require('../controllers/user');

// Read
router.get('/', getUsers);
router.get('/:id', getAUser);
router.post('/', createUser);

module.exports = router;
