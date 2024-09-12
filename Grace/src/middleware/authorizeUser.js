import httpStatus from "http-status";
export const authorizeUser = (permittedRoles) => {
  return (req, res, next) => {
    if (!permittedRoles.includes(req.user.role)) {
      res.status(httpStatus.UNAUTHORIZED).json({
        status: "error",
        payload: `User with role ${
          req.user.role
        } is not permitted on the endpoint. Only ${permittedRoles.join(",")} ${
          permittedRoles.length > 1 ? "are" : "is"
        } allowed`,
      });
      return;
    }
    next();
  };
};

// This code defines a middleware function (`authorizeUser`) that checks whether the role of the authenticated user is included in the list of permitted roles for accessing a specific endpoint. Let's break down the code:

// 1. **Import Dependencies:**
//    - `httpStatus` is imported to handle HTTP status codes.

// 2. **Middleware Function (`authorizeUser`):**
// // // //    - The `authorizeUser` function takes one parameter, `permittedRoles`, which is an array of roles that are allowed to access the protected endpoint.

// 3. **Authorization Logic:**
// // // //    - The returned middleware function (the inner function) takes three parameters: `req` (request), `res` (response), and `next` (next middleware function).
// // //    - It checks if the user's role, obtained from `req.user.role`, is included in the `permittedRoles` array.
// // //    - If the user's role is not in the `permittedRoles` array, it sends a 401 Unauthorized response.
// // // // //    - The response includes a JSON object with an "error" key and a message explaining that the user's role is not permitted on the endpoint. It also provides information about the roles that are allowed.
// // // //    - If the user's role is permitted, the middleware calls the `next()` function to allow the request to proceed to the next middleware or route handler.

// 4. **Response Message:**
// // //    - The response message includes dynamic content based on the user's role and the roles that are permitted.
// // //  - Example message: "User with role 'admin' is not permitted on the endpoint. Only 'user, moderator' are allowed."

// // // // // // // // In summary, this middleware is designed to restrict access to certain endpoints based on the user's role. If the user's role is not included in the list of permitted roles, a 401 Unauthorized response is sent; otherwise, the request is allowed to proceed. This type of middleware is commonly used to implement role-based access control in web applications.
