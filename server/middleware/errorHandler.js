"use strict";

const errorHandler = async (error, req, res, next) => {
  let code = 500;
  let msg = "Something went wrong with the server";

  if (
    error.name === "INVALID_EMAIL_OR_PASSWORD" ||
    error === "INVALID_EMAIL_OR_PASSWORD"
  ) {
    code = 401;
    msg = "Invalid username or password";
  } else if (error.name === "CREATE_FAIL" || error === "CREATE_FAIL") {
    code = 400;
    msg = error.message;
  } else if (
    error.name === "INVALID_AUTHORIZATION" ||
    error === "INVALID_AUTHORIZATION"
  ) {
    code = 403;
    msg = "You don't have the previlage to do that";
  } else if (error.name === "NOT_FOUND" || error === "NOT_FOUND") {
    code = 404;
    msg = "Data not found";
  } else if (error.name === "JsonWebTokenError") {
    code = 401;
    msg = "Please login first!";
  } else if (
    error.name === "SequelizeForeignKeyConstraintError" ||
    error === "SequelizeForeignKeyConstraintError"
  ) {
    (code = 405), (msg = "Cannot delete the data");
  } else if (
    error.name === "SequelizeValidationError" ||
    error === "SequelizeValidationError"
  ) {
    code = 400;
    msg = error.errors[0].message;
  } else if (
    error.name === "SequelizeUniqueConstraintError" ||
    error === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    msg = error.errors[0].message;
  }
  res.status(code).json({
    statusCode: code,
    data: msg,
  });
};

module.exports = { errorHandler };
