const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  let message;
  if (statusCode >= 500) {
    message = error.message || "Internal server error";
  } else {
    if (statusCode >= 400 && statusCode < 500) {
      message = error.message || "unauthorized or invalid data format";
    }
  }

  res.status(statusCode).json({
    message: message,
    statusCode: statusCode,
  });
};

export default errorMiddleware;
