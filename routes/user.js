const router = require("express").Router();

const { getUser, updateUser } = require("../controllers/user");

const { validateUpdateUser } = require("../middlewares/validation");

const auth = require("../middlewares/auth");

// Read
router.get("/me", auth, getUser);
router.patch("/me", auth, validateUpdateUser, updateUser);

module.exports = router;
