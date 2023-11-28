import User from "../../models/user/user.js";
import httpStatus from "http-status";

const createUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //import the db model and create the user
  //User.findOne({_id:req.params.id})
  //User.findById(req.params.id)
  const emailExist = await User.findOne({
    email: data.email,
  });
  if (emailExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with email already exist",
    });
    return;
  }

  const usernameExist = await User.findOne({
    username: data.username,
  });
  if (usernameExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with yusername already exist",
    });
    return;
  }

  const createdUser = await User.create({
    username: data.username,
    password: data.password,
    email: data.email,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: createdUser,
  });
};

const loginUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //check if user is registered
  const userExist = await User.findOne({
    email: data.email,
  });

  if (!userExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "No record found",
    });
    return;
  }

  //check that password is correct
  if (userExist.password !== data.password) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Credential not correct",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: userExist,
  });
};

export { createUser, loginUser };
