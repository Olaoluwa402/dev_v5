import httpStatus from "http-status";
import JWT from "jsonwebtoken";
import User from "../models/user/user.js";
export const verifyUser = async (req, res, next) => {
  //get the token from the request header

  /*
    1. check that header contain token and that it is in the  right format (bearer token)
    2. extract the token
    3. comfirm the token is the one issued, signed and not expired
    4. use the id from the decoded token to get the user detail
    5. attach the user detail to the request user
    6. move action to the next controller using next function
    7. throw errors when necessary

    typical header format
    const options = {
    header: {
    Content-Type: "Application/json",
    authorization: `Bearer ytytytytytytyt`
    }
    }
    await axios.post("http://example.com", {}, options)
    */
  // 1,
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: "No token, not unauthorized",
    });
    return;
  }
  //'Bearer ytytytytyty'.split(" ") => ["Bearer", "ytytytytyty"]
  // 2,
  const token = req.headers.authorization.split(" ")[1];
  console.log(token, "token");
  //3, confirm if the one issued, signed and not expired
  const decoded = JWT.decode(token, process.env.JWT_SECRET);
  console.log(decoded, "decoded");
  if (!decoded) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: "Authorization failed, TOken is invaild",
    });
    return;
  }
  //4, use the id from the decoded token to get the user detail
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "Authorization failed, user n ot found",
    });
    return;
  }
  //5, attach the user details to the req.user
  req.user = user;
  next();
  // 6, move action to the next controller using next function
};

// This code defines a middleware function (`verifyUser`) that is designed to verify and authenticate users based on a JSON Web Token (JWT) passed in the request header. Here's a breakdown of each part of the code:

// 1. **Import Dependencies:**
//    - `httpStatus` is imported to handle HTTP status codes.
//    - `JWT` is imported for JSON Web Token handling.
// //    - The `User` model is imported from "../models/user/user.js", which is likely a MongoDB model representing user data.

// 2. **Middleware Function (`verifyUser`):**
// //    - The `verifyUser` function takes three parameters: `req` (request), `res` (response), and `next` (next middleware function).
// //    - The purpose of this middleware is to verify the authenticity of the user by checking the JWT provided in the request header.

// 3. **Token Verification Steps:**
//    - **Step 1: Check Authorization Header:**
// // //  - Checks if the request has headers, if there's an authorization header, and if the header starts with "Bearer". If not, it returns a 400 Bad Request response indicating that the token is required.

//    - **Step 2: Extract Token:**
// //  - If the header is present, it extracts the token from the "Authorization" header (which is expected to be in the format "Bearer <token>").

//    - **Step 3: Decode Token:**
// //  - Decodes the extracted token using the `JWT.decode` method, providing the token and the secret key (`process.env.JWT_SECRET`).
//  - If the decoding fails or the token is invalid, it returns a 400 Bad Request response.

//    - **Step 4: Fetch User Details:**
// //  - Uses the decoded user ID to retrieve the user details from the database using the `User.findById` method.
//  - If the user is not found, it returns a 404 Not Found response.

//    - **Step 5: Attach User Details to Request Object:**
//  - If the user is found, it attaches the user details to the `req.user` property.

//    - **Step 6: Move to Next Middleware:**
//  - Calls the `next()` function to pass control to the next middleware in the stack.

// 4. **Error Handling:**
// //    - At each step, if an error is encountered (e.g., missing token, invalid token, user not found), the middleware returns an appropriate HTTP response and does not proceed to the next middleware.

// // // // This middleware is designed to be used in routes that require user authentication. If the JWT is valid, the user details are attached to the request object (`req.user`), allowing subsequent middleware or route handlers to access the authenticated user's information. If the JWT is invalid or the user is not found, appropriate error responses are sent.
