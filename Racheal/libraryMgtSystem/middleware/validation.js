import httpStatus from "http-status";

export const validationMiddleware = (schema, type) => {
    return async (req, res, next) => {
        const validationOptions = {
            abortEarly: false,
            abortAny: true,
            allowStripe: true
        };
        try{
            const value = await schema.validateAsync(req.body, validationOptions);
            req.body=value
            next()
        }
        catch(err) {
            const error = []
            err.details.forEach(errors => error.push(errors.message) );

            res.status(httpStatus.BAD_REQUEST).json({
                status: "validation error",
                error,
            })
        }
    }
}