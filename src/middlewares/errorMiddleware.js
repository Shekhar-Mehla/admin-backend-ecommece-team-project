import responseClient from "../utility/responseClient.js";

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

  responseClient({ req, res, statusCode, message });
};

export default errorMiddleware;
