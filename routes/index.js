const router = require("express").Router();

const { STATUS_CODES } = require("../utils/errors");

const clothingItem = require("./clothingItem");

const user = require("./user");

const auth = require("../middlewares/auth");

const {validateUserLogin, validateUserBody} = require("../middlewares/validation")

const {login, createUser} = require('../controllers/user')



router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserBody, createUser);

router.use("/items", clothingItem);
router.use("/user", auth, user);

router.use(auth, (req, res) => [
  res
    .status(STATUS_CODES.NotFound)
    .send({ message: "Requested resource not found" }),
]);

module.exports = router;
