import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../../models/user/user.js";
import httpStatus from "http-status";
import { jwtToken } from "../../util/generateToken.js";

const createUser = async (req, res) => {
  const data = req.body;
  const userExist = await User.findOne({ user: data.username });
  if (userExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "Error",
      payload: "Username already existing",
    });
    return;
  }

  const emailExist = await User.findOne({ email: data.email });
  if (emailExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "Error",
      payload: "Email already existing",
    });
    return;
  }

  //hash password
  const sumRound = 10;
  const hash = await bcrypt.hash(data.password, sumRound);

  const createUser = await User.create({
    username: data.username,
    password: hash, //hash the password usa ing bcrypt
    email: data.email,
  });
  res.status(httpStatus.CREATED).json({
    status: "success",
    payload: createUser,
  });
};

const loginUser = async (req, res) => {
  const data = req.body;
  const userExist = await User.findOne({
    email: data.email,
  });
  if (!userExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "user not found",
    });
    return;
  }
  //check that password is correct
  const iscomfirmed = await ComparePassword(data.password, userExist.password);

  if (!iscomfirmed) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: "password not correct",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: userExist,
    token: jwtToken(userExist._id, userExist.email),
  });
};

async function ComparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(httpStatus.OK).json({
      status: "success",
      payload: users,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error,
    });
  }
};

// const getUser = async (req, res) => {
// try {
// const user = await user.findById(req.params.id).populate("inflows");
// another way is user.findOne({_id: req.params.id})
// res.status(httpStatus.OK).json({
// status: "success",
// payload: user,
// });
// } catch (error) {
// res.status(httpStatus.BAD_REQUEST).json({
// status: "error",
// payload: error,
// });
// }
// };

const getUser = async (req, res) => {
  const id = req.params.id;
  const type = req.query.type;
  const email = req.query.email;
  const username = req.query.username;

  let user;
  switch (type) {
    case "ID":
      user = await User.findById(id);
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          payload: "user with id not found",
        });
        break;
      }
      res.status(httpStatus.OK).json({
        status: "sucesss",
        payload: user,
      });
      break;

    case "EMAIL":
      user = await User.findOne({ email: email });
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          payload: "user with EMAIL not found",
        });
        break;
      }
      res.status(httpStatus.OK).json({
        status: "sucesss",
        payload: user,
      });
      break;

    case "USERNAME":
      user = await User.findOne({ username: username });
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          payload: "user with username not found",
        });
        break;
      }
      res.status(httpStatus.OK).json({
        status: "sucesss",
        payload: user,
      });
      break;
    default:
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: "user not found",
      });
  }
};

const updateUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("email, password", email, password);
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "user not found",
    });
  }
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "user not email already exist. provide another email",
    });
    return;
  }
  const updateUser = await User.findByIdAndUpdate(
    id,
    { email: email, password: password },
    { new: true }
  );
  res.status(httpStatus.OK).json({
    status: "success",
    payload: updateUser,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "user not found",
    });
  }
  await User.findByIdAndDelete(id);
  res.status(httpStatus.OK).json({
    status: "Success",
    payload: `user with ID ${id} is deleted`,
  });
};

export { createUser, loginUser, getAllUser, getUser, updateUser, deleteUser };
