import UserModel from "../../Models/User.js";
import bcryptjs from "bcryptjs";
import { serialize } from "../../Utility/Serialize.js";
import httpStatus from "http-status";
import { uniqueCode } from "../../Utility/uniqueCode.js";
import { generateToken } from "../../Utility/jwt-token.js";
import { deleteText, readText } from "../../Utility/Fs.js";

export const createUser = async (req, res) => {
  const data = req.body;

  try {
    const userExist = await UserModel.findOne({ email: data.email });
    if (userExist) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        payload: "User with the email already exist",
      });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(data.password, saltRounds);

    const user = await UserModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
      address: data.address,
      userCode: uniqueCode(7),
    });

    res.status(httpStatus.CREATED).json({
      status: "success",
      payload: serialize(user),
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "errors",
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await UserModel.findOne({ email: email });
    if (!userExist) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    const decodePassword = await bcryptjs.compare(password, userExist.password);
    if (!decodePassword) {
      res.status(httpStatus.FORBIDDEN).json({
        status: "error",
        message: "Credentials does not match",
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: "success",
      payload: serialize(userExist),
      token: generateToken(userExist._id, userExist.email),
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "errors",
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(httpStatus.OK).json({
      status: "success",
      payload: users,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "errors",
      payload: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      res.status(httpStatus).json({
        status: "error",
        payload: "User not found",
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "errors",
      payload: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  const { address, password, username, phoneNumber } = req.body;

  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: "User not found",
      });
      return;
    }
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { address, password, username, phoneNumber },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      status: "success",
      payload: updatedUser,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "errors",
      payload: error.message,
    });
  }
};

export const userProfileUpload = async (req, res) => {
  const userId = req.params.id;

  const foundUser = await UserModel.findOne({ _id: userId });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
    return;
  }

  const filePresent = await readText(`public/${foundUser.avatar}`);
  if (filePresent) {
    await deleteText(`public/${foundUser.avatar}`);
  }

  const uploadUserImage = await UserModel.findOneAndUpdate(
    { _id: userId },
    { avatar: req.file.filename },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: uploadUserImage,
  });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: "User not found",
      });
      return;
    }
    await UserModel.findByIdAndDelete({ _id: userId });
    res.status(httpStatus.OK).json({
      status: "success",
      payload: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "errors",
      payload: error.message,
    });
  }
};
