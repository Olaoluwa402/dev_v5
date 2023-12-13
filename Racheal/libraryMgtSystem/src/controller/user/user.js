import LibUser from "../../Models/User/user";
import httpStatus from "http-status";

const createLibUser = async (req, res) => {
  const data = req.body;
  const emailExist = await LibUser.findOne({
    email: data.email,
  });
  if (emailExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "LibUser with email already exists",
    });
    return;
  }
  const usernameExist = await LibUser.findOne({
    username: data.username,
  });
  if (usernameExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: error,
      message: "username already exists",
    });
    return;
  }
  const createdUser = await LibUser.create({
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
  const userExists = await LibUser.findOne({
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
  const allUsers = await LibUser.find({});
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
      user = await LibUser.findById(id);
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
      user = await LibUser.findOne({
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
      user = await LibUser.findOne({
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
        status: "success",
        data: user
      })
      break;

      default: 
      res.status(httpStatus.NOT_FOUND).json({
        status: error,
        message: "User not found"
      })
  }
};
const updateUser = async (req, res) => {
  const {email, password} = req.body
  const { id } = req.params
  const foundUser = await LibUser.findOne({_id:id})
  if(!foundUser){
    res.status(httpStatus.NOT_FOUND).json({
        status: error,
        message: "user with id not found"
    })
  }

  const emailExist = await LibUser.findOne({
    email: email
  })
  if(emailExist){
    res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Email not available use another email"
    })
    return;
  }
  const updatedUser = await LibUser.findByIdAndUpdate(id, {
    email: email, password: password}, {new: true}
  )
}
const deleteUser = async (req, res) => {
    const {id} = req.params
    const foundUser = await LibUser.findOne({_id: id})
    if(!foundUser){
        res.status(httpStatus.NOT_FOUND).json({
            error: "error",
            status: "User not found"
        })
        return;
    }
    await LibUser.findByIdAndDelete({_id: id})
    res.status(httpStatus.OK).json({
        status: "deleted successfully",
        data: `user with ${id} has been deleted`
    })

}
export {createLibUser, loginUser, getUser, getUsers, updateUser, deleteUser}
