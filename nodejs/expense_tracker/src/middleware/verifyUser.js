import httpStatus from "http-status";
import JWT from "jsonwebtoken";
import User from "../models/user/user.js";
export const verifyUser = async (req, res, next) => {
  //get the token from the req header
  /*
    1. check that header contain token 
     and that it is in the right format (Bearer token)
     
    //2. extract the token 
    //3. confirm the token is the one issued, signed and not expired
    //4. used the id from the decoded token to get the user detail
    //5. atthed teh user detail to the req.user
    //6. move action to the next controller using next function
    //7. over throw errors where necessary

     // typical header format
      const options = {
        header:{
            Content-Type:"Aplication/json",
            authorization:`Bearer ytytyututuytuytutuyt`
        },
      }

      await axios.post("http://example.com", {}, options)
    */

  //1.
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Authorization failed, Token is required",
    });
    return;
  }
  //'Bearer khjkgjjg'.split(" ") => ["Bearer","hkjkhjhkj"]
  //2.
  const token = req.headers.authorization.split(" ")[1];
  console.log(token, "tokekn");

  //3. confirm the token is the one issued, signed and not expired
  const decoded = JWT.decode(token, process.env.JWT_SECRET);
  console.log(decoded, "decoded");
  if (!decoded) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Authorization failed, Token is invalid",
    });
    return;
  }

  //4. used the id from the decoded token to get the user detail
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Authorization failed, User not found",
    });
    return;
  }

  //5. attach the user detail to the req.user
  req.user = user;

  //6. move action to the next controller using next function
  next();
};
