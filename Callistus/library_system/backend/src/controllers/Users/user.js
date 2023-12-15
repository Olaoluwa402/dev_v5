import User from "../../model/users/user.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import { jwtToken } from "../../util/generateToken.js";

const createUser = async (req, res) => {
  const data = req.body;

  // checking if email exits
  const emailExists = await User.findOne({
    email: data.email,
  });

  if (emailExists) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Email already exists",
    });
    return;
  }

  // checking if username exists
  const usernameExists = await User.findOne({
    username: data.username,
  });

  if (usernameExists) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Username already exists",
    });
    return;
  }

  // hash password
  const saltRound = 10;
  const hash = await bcrypt.hash(data.password, saltRound);

  const createdUser = await User.create({
    username: data.username,
    password: hash,
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1702166400&semt=sph",
  });

  res.status(httpStatus.OK).json({
    status: "success",
    data: createdUser,
  });
};

const loginUser = async (req, res) => {
  const data = req.body;

  // check if user exists
  const userExists = User.findOne({
    email: data.email,
  });

  if (!userExists) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "No record found",
    });
      return
  }

  const isConfirmed = await comparePassword(data.password, userExists.password);

  if (!isConfirmed) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Invalid login details",
    });
      return
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: userExists,
    token: jwtToken(userExists._id, userExists.email),
  });
    
    async function comparePassword(plainpassword, hashedPassword) {
    return bcrypt.compare(plainpassword, hashedPassword)
}
};

export { createUser, loginUser };
