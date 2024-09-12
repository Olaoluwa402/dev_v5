import httpStatus from "http-status";

export const validationMiddleware = (schema, type) => {
  return async (req, res, next) => {
    const validationOption = {
      abortEarly: false,
      allowAny: true,
      allowScript: true,
    };
    try {
      if (type == "QUERY") {
        const value = await schema.validateAsync(req.query, validationOption);
        req.query = value;
        next();
      } else if (type == "PARAMS") {
        const value = await schema.validateAsync(req.params, validationOption);
        req.params = value;
        next();
      } else {
        const value = await schema.validateAsync(req.body, validationOption);
        req.body = value;
        next();
      }
    } catch (error) {
      const errors = [];
      error.details.forEach((error) => {
        errors.push(error.message);
      });
      res.status(httpStatus.BAD_REQUEST).json({
        error: "validation error",
        errors,
      });
    }
  };
};

//
// This code defines a middleware function (`validationMiddleware`) that is designed to perform validation on request parameters (either `req.body` or `req.query`) using a provided schema. The validation is done using the Joi library, which is a powerful object schema description language and validator for JavaScript.
//
// Let's break down the code:
//
// 1. **Import Dependencies:**
//  - `httpStatus` is imported to handle HTTP status codes.
//
// 2. **Middleware Function (`validationMiddleware`):**
//  - The `validationMiddleware` function takes two parameters: `schema` (the Joi schema for validation) and `type` (specifying whether to validate `req.body` or `req.query`).
//
// 3. **Validation Options:**
//  - `valitionOptions` object contains options for the validation process:
//  - `abortEarly`: If set to `false`, the validation will continue after encountering the first error, and all errors will be reported.
//  - `allowAny`: A custom option (not part of Joi) that seems to be set to `true`.
//  - `allowStripe`: Another custom option set to `true`.
//
// 4. **Try-Catch Block:**
//  - The function uses a try-catch block to handle the validation process.
//
// 5. **Validation based on Type:**
//  - If the `type` is "QUERY," it validates `req.query` against the provided schema using `schema.validateAsync`. If successful, the validated data is assigned to `req.query`, and the middleware proceeds to the next middleware or route handler (`next()` is called).
//  - If the `type` is not "QUERY," it assumes validation for `req.body` and follows a similar process.
//
// 6. **Validation Failure:**
//  - If validation fails (an error is caught), the catch block is executed.
//  - It iterates through the details of the validation error and extracts the error messages.
//  - It then sends a 400 Bad Request response with a JSON object containing an "error" key and an array of error messages.
//
// In summary, this middleware simplifies the process of validating request parameters against a Joi schema. It can be used in routes to ensure that incoming data adheres to a specified schema, and it provides a standardized way to handle validation errors in the API responses.
