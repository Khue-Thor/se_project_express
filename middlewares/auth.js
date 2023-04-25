const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require("../utils/errors/unauthorized");

const handleAuthError = () => {
  throw new UnauthorizedError('Authorization Error');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
