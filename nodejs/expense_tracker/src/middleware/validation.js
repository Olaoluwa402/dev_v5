import httpStatus from "http-status";

export const validationMiddleware = (schema, type) => {
  return async (req, res, next) => {
    const valitionOptions = {
      abortEarly: false,
      allowAny: true,
      allowStripe: true,
    };
    try {
      if (type == "QUERY") {
        const value = await schema.validateAsync(req.query, valitionOptions);
        req.query = value;
        next();
        return;
      }
      const value = await schema.validateAsync(req.body, valitionOptions);
      req.body = value;
      next();
    } catch (err) {
      const errors = [];
      err.details.forEach((error) => {
        errors.push(error.message);
      });

      res.status(httpStatus.BAD_REQUEST).json({
        error: "validation error",
        errors,
      });
    }
  };
};
