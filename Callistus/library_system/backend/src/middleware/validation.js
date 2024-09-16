import httpStatus from "http-status";

export const validationMiddleware = (schema, type) => {
    return async (req, res, next) => {
        const validationOptions = {
            abortEarly: false,
            allowAny: true,
            allowStripe: true,
        }; 
        try {
            const value = await schema.validateAsync(req.body, validationOptions);
            req.body = value;
            next()
        } catch (err) {
            const errors = [];
            err.details.forEach((error) => {
                errors.push(error.message);
            });

            res.status(httpStatus.BAD_REQUEST).json({
                error: "validation error",
                errors,
            })
        }
    } 
 }