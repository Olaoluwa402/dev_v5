import JWT from "jsonwebtoken";
import httpStatus from "http-status";
import User from "../model/users/user";

export const verifyUser = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
      res.status(httpStatus.BAD_REQUEST).json({
          status: "error",
          message: "Authorization failed, token is required"
      })
      return
    }
    
    const token = req.headers.authorization.split(" ")[1]
    console.log(token + "token")

    const decoded = JWT.decode(token, process.env.JWT_SECRET)
    if (!decoded) {
        res.status(httpStatus.BAD_GATEWAY).json({
            status: "error",
            message: "Authorization failed, invalid token",
        })
        return
    }

    const user = await User.findById(decoded.id)
    if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
            status: "error",
            message: "Authorization failed, user not found",
        })
        return
    }

    req.user = user
};
