import User from '../../models/user/user.js';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { jwtToken } from '../../util/generateToken.js';
import { deleteText, readText } from '../../util/FsUtils.js';
import { uploadToCloudinary, uploadSingleOrMultiImagesToClodinary } from 'cloudi-upload-with-ease';

const createUser = async (req, res) => {
    //collect the data from req body
    const data = req.body;
    //import the db model and create the user
    //User.findOne({_id:req.params.id})
    //User.findById(req.params.id)
    const emailExist = await User.findOne({
        email: data.email
    });
    if (emailExist) {
        res.status(httpStatus.BAD_REQUEST).json({
            status: 'error',
            message: 'User with email already exist'
        });
        return;
    }

    const usernameExist = await User.findOne({
        username: data.username
    });
    if (usernameExist) {
        res.status(httpStatus.BAD_REQUEST).json({
            status: 'error',
            message: 'User with yusername already exist'
        });
        return;
    }

    //hass password
    const saltRound = 10;
    const hash = await bcrypt.hash(data.password, saltRound);

    const createdUser = await User.create({
        username: data.username,
        password: hash, //hash the password using bcrycpt
        email: data.email,
        avatar: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1702166400&semt=sph'
        // role: "admin",
    });

    res.status(httpStatus.CREATED).json({
        status: 'success',
        data: createdUser
    });
};

const loginUser = async (req, res) => {
    //collect the data from req body
    const data = req.body;

    //check if user is registered
    const userExist = await User.findOne({
        email: data.email
    });

    if (!userExist) {
        res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: 'No record found'
        });
        return;
    }

    //check that password is correct
    const isConfirmed = await ComparePassword(data.password, userExist.password);

    if (!isConfirmed) {
        res.status(httpStatus.BAD_REQUEST).json({
            status: 'error',
            message: 'Credential not correct'
        });
        return;
    }

    res.status(httpStatus.OK).json({
        status: 'success',
        data: userExist,
        token: jwtToken(userExist._id, userExist.email)
    });
};

async function ComparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(httpStatus.OK).json({
        status: 'success',
        data: users
    });
};

const getUser = async (req, res) => {
    const type = req.query.type;
    const email = req.query.email;
    const username = req.query.username;
    const id = req.query.id;

    console.log(type, email, 'type');

    let user;
    switch (type) {
        case 'ID':
            user = await User.findById(id);
            if (!user) {
                res.status(httpStatus.NOT_FOUND).json({
                    status: 'error',
                    message: 'User with id not found'
                });
                break;
            }

            res.status(httpStatus.OK).json({
                status: 'success',
                data: user
            });
            break;

        case 'EMAIL':
            user = await User.findOne({ email: email });
            if (!user) {
                res.status(httpStatus.NOT_FOUND).json({
                    status: 'error',
                    message: 'User with email not found'
                });
                break;
            }

            res.status(httpStatus.OK).json({
                status: 'success',
                data: user
            });
            break;

        case 'USERNAME':
            user = await User.findOne({ username: username });
            if (!user) {
                res.status(httpStatus.NOT_FOUND).json({
                    status: 'error',
                    message: 'User with username not found'
                });
                break;
            }

            res.status(httpStatus.OK).json({
                status: 'success',
                data: user
            });
            break;

        default:
            res.status(httpStatus.NOT_FOUND).json({
                status: 'error',
                message: 'User not found'
            });
    }
};

const updateUser = async (req, res) => {
    const { email, password } = req.body;
    const { id } = req.params;
    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
        res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: 'User not found'
        });
    }

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: 'User with email already exist. Pls provide a unique email'
        });
        return;
    }
    const updatedUser = await User.findByIdAndUpdate(id, { email: email, password: password }, { new: true });

    res.status(httpStatus.OK).json({
        status: 'success',
        data: updatedUser
    });
};

const userProfileUpload = async (req, res) => {
    const userId = req.user.id;
    console.log(req.file, 'req.file');

    // const config = {
    //   cloudinary_cloud_name: process.env.cloudinary_cloud_name,
    //   cloudinary_api_key: process.env.cloudinary_api_key,
    //   cloudinary_api_secret: process.env.cloudinary_api_secret,
    // };

    //   const response = await uploadSingleOrMultiImagesToClodinary(
    //     req.files,
    //     "image",
    //     config
    //   );

    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
        res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: 'User not found'
        });
        return;
    }

    //remove old file from server
    try {
        const filePresent = await readText(`public/${foundUser.avatar}`);
        console.log(filePresent, 'filePresent');
        if (filePresent) {
            await deleteText(`public/${foundUser.avatar}`);
        }

        const userWithImageUpload = await User.findByIdAndUpdate({ _id: userId }, { avatar: req.file.filename }, { new: true });

        res.status(httpStatus.OK).json({
            status: 'success',
            data: userWithImageUpload
        });
    } catch (error) {
        console.log(error, 'error');
        res.status(httpStatus.BAD_REQUEST).json({
            status: 'error',
            data: error
        });
    }
};

const deleteUser = async (req, res) => {
    //const id = req.user.id : this is made possible by the use of verifyUser middlare in this route

    const { id } = req.params;
    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
        res.status(httpStatus.NOT_FOUND).json({
            status: 'error',
            message: 'User not found'
        });
        return;
    }

    await User.findByIdAndDelete(id);

    //remove old file from server
    const filePresent = await readText(`public/${foundUser.avatar}`);
    if (filePresent) {
        await deleteText(`public/${foundUser.avatar}`);
    }

    res.status(httpStatus.OK).json({
        status: 'success',
        data: `User with ID ${id} is deleted`
    });
};

export { createUser, loginUser, getUsers, getUser, updateUser, deleteUser, userProfileUpload };
