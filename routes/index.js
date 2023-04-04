const router = require('express').Router();

const clothingItem = require('./clothingItem');
const user = require('./user');

router.use('/items', clothingItem);
router.use('/users', user);
router.use((req, res) => [
  res.status(404).send({ message: 'Requested resource not found' }),
]);

module.exports = router;
