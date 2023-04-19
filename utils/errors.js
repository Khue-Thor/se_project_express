const STATUS_CODES = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ConflictError: 409,
  ServerError: 500,
  DuplicataeEroor: 11000,
}

const ErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
}

module.exports = {
  STATUS_CODES,
  ErrorHandler,
}