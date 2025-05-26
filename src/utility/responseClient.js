const responseClient = ({ req, res, statusCode = 200, message, payload }) => {
  let status;
  if (statusCode <= 299 && statusCode >= 200) {
    status = "success";
  } else {
    status = "error";
  }

  res.status(statusCode).json({
    status,
    message,
    payload,
  });
};
export default responseClient;
