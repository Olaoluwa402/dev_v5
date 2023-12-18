import User from "../../model/users/user.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { jwtToken } from "../../util/generateToken.js";

const createUser = async (req, res) => {
  const data = req.body;
  console.log(`${data.email} - ${data.password} - ${data.username} - ${data.role}`)

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
    email: data.email,
    password: hash,
    role: data.role,
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1702166400&semt=sph",
  });

  res.status(httpStatus.OK).json({
    status: "success",
    data: createdUser,
  });

};

// users login function
const loginUser = async (req, res) => {
  try {
    const data = req.body;

    // check if user exists
    const userExists = await User.findOne({
      email: data.email,
    });

    if (!userExists) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "No record found",
      });
    }

    const isConfirmed = await comparePassword(data.password, userExists.password);

    if (!isConfirmed) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Invalid login details",
      });
    }

    return res.status(httpStatus.OK).json({
      status: "success",
      data: userExists,
      token: jwtToken(userExists._id, userExists.email),
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// getting all users
const getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(httpStatus.OK).json({
    status: "success",
    data: users,
  })
}
import mongoose from 'mongoose';

// Validate that the provided ID is a valid MongoDB ObjectId
const isValidObjectId = mongoose.Types.ObjectId.isValid;

const getUser = async (req, res) => {
  const id = req.params.id;
  const type = req.query.type;
  const username = req.query.username;
  const email = req.query.email;

  console.log(email, username, type, id);

  let user;

  try {
    switch (type) {
      case 'ID':
        if (!isValidObjectId(id)) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: 'error',
            message: 'Invalid ID format',
          });
        }

        user = await User.findById(id);

        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: `User with ID ${id} not found`,
          });
        }

        res.status(httpStatus.OK).json({
          status: 'success',
          data: user,
        });
        break;

      case 'EMAIL':
        user = await User.findOne({ email: email });

        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: `User with email ${email} not found`,
          });
        }

        res.status(httpStatus.OK).json({
          status: 'success',
          data: user,
        });
        break;

      case 'USERNAME':
        user = await User.findOne({ username: username });

        if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: `User with username ${username} not found`,
          });
        }

        res.status(httpStatus.OK).json({
          status: 'success',
          data: user,
        });
        break;

      default:
        res.status(httpStatus.NOT_FOUND).json({
          status: 'error',
          message: 'User not found',
        });
    }
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const updateUser = async (req, res) => {
  const { email, password } = req.body
  const { id } = req.params

  const foundUser = await User.findOne({ _id: id })

  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    })
    return
  }

  const emailExists = await User.findOne({ email: email })
  
  if (emailExists) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Email already exists, please provide a unique email address"
    })
   return
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { email: email, password: password },
    {new: true}
  )

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedUser,
  })
}
 

export { createUser, loginUser, getUsers, getUser, updateUser};
