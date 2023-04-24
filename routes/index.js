const router = require("express").Router();

const NotFoundError = require('../utils/errors/notfound')

const clothingItem = require("./clothingItem");

const user = require("./user");

const auth = require("../middlewares/auth");

const {validateUserLogin, validateUserBody} = require("../middlewares/validation")

const {login, createUser} = require('../controllers/user')


router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserBody, createUser);

router.use("/items", clothingItem);
router.use("/user", auth, user);

router.use(auth, (req, res, next) => {
  throw new NotFoundError('Requested resource not found')
});

module.exports = router;
