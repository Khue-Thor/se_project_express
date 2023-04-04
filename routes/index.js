const router = require('express').Router();
const STATUS_CODES = require('../utils/errors')
const clothingItem = require('./clothingItem');
const user = require('./user');

router.use('/items', clothingItem);
router.use('/users', user);
router.use((req, res) => [
  res.status(STATUS_CODES.NotFound).send({ message: 'Requested resource not found' }),
]);

module.exports = router;
