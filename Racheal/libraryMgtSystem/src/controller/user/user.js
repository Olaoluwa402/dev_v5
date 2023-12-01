import User from "../../../../../nodejs/expense_tracker/src/models/user/user";
import LibUser from "../../Models/User/user";
import httpStatus from "http-status";

const createLibUser = async (req, res) => {
  const data = req.body;
  const emailExist = await User.findOne({
    email: data.email,
  });
  if (emailExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with email already exists",
    });
    return;
  }
  const usernameExist = await User.findOne({
    username: data.username,
  });
  if (usernameExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: error,
      message: "username already exists",
    });
    return;
  }
  const createdUser = await User.create({
    firstname: data.firstname,
    lastname: data.lastname,
    password: data.password,
    phonenumber: data.phonenumber,
    address: data.address,
    username: data.username,
    email: data.email,
  });
  res.status(httpStatus.CREATED).json({
    status: "created",
    data: createdUser,
  });
};
const loginUser = async (req, res) => {
  const data = req.body;
  const userExists = await User.findOne({
    email: data.email,
  });
  if (!userExists) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "user does not exist",
    });
    return;
  }
  if (userExists.password !== data.password) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "incorrect credential",
    });
    return;
  }
  res.status(httpStatus.OK).json({
    status: "success",
    data: userExists,
  });
};
const getUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(httpStatus.OK).json({
    status: "success",
    data: allUsers,
  });
};
const getUser = async (req, res) => {
  const { id } = req.params;
  const { type, email, username } = req.query;
  console.log(type, email, "type");

  let user;
  switch (type) {
    case "ID":
      user = await User.findById(id);
      if (!user) {
        res.status(http.BAD_REQUEST).json({
          status: "error",
          message: "user with id not found",
        });
        break;
      }
      res.status(httpStatus.Ok).json({
        status: "success",
        data: user,
      });
      break;
    case "EMAIL":
      user = await User.findOne({
        email: email,
      });
      if (!user) {
        res.status(httpStatus.BAD_REQUEST).json({
          status: "error",
          message: "User with email not found",
        });
        break;
      }
      res.status(httpStatus.OK).json({
        status: "success",
      });
      break;

    case "USERNAME":
      user = await User.findOne({
        username: username,
      });
      if(!user){
        res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: "username not found"
        })
        break;
      }
      res.status(httpStatus.OK).json({
        ststus: "success",
        data: user
      })
      break;
  }
};
