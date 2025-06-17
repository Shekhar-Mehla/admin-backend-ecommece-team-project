const responseClient = ({ res, statusCode = 200, message, payload }) => {
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

// we could also  use this for this  simple and clean code

// export const buildSuccessResponse = (res, data, message = "") => {
//   return res.json({
//     status: "success",
//     data,
//     message,
//   });
// };

// export const buildErrorResponse = (res, message = "") => {
//   res.json({
//     status: "error",
//     message: message || "Something went wrong!",
//   });
// };
