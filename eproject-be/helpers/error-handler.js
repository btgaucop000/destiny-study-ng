function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: "User is not authorized!",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
}

module.exports = errorHandler;