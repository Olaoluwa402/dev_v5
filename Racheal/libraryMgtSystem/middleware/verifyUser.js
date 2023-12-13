import httpStatus from "http-status";
import JWT from "jsonwebtoken"
import LibUser from "../src/Models/User/user";

import LibUser from "../src/Models/User/user";
export const verifyUser = async (req, res, next) => {
if(!req.headers|| !req.headers.authorisation || !req.headers.authorisation.startsWith(Bearer)){
    res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Authorization failed, Token is required",
    })
    return;
}
const token = req.headers.authorisation.split("")[1]
console.log(token, "token");
const decoded = JWT.decode(token, process.env.JWT_SECRET)
console.log(decoded, "decoded")
if(!decoded) {
    res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Authorisation, token is invalid"
    })
    return;
}
const user = await LibUser.findById({decoded:id})
if(!user) {
    res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "authorisation failed, user not found"
    })
    return;
}
req.user = user;
next()
}