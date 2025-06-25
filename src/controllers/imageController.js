import responseClient from "../utility/responseClient.js";

const imageController = (req, res, next) => {
  try {
    if (req.files && Array.isArray(req.files)) {
      console.log(req.files);
      return responseClient({ res, payload: req.files, message: "here" });
    } else {
      responseClient({
        res,
        statusCode: 400,
        message: "could not uploaded image on server. try again😒",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default imageController;
