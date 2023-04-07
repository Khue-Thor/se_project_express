const router = require("express").Router();

const { STATUS_CODES } = require("../utils/errors");

const clothingItem = require("./clothingItem");

const user = require("./user");

const {login, createUser} = require('../controllers/user')

const auth = require("../middlewares/auth");

router.post('/signin', auth, login);
router.post('/signup', auth, createUser);

router.use("/items", clothingItem);
router.use("/users", auth, user);

router.use((req, res) => [
  res
    .status(STATUS_CODES.NotFound)
    .send({ message: "Requested resource not found" }),
]);

module.exports = router;
