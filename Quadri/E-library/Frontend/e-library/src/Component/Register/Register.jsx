import { useState } from "react";
import Logo from "../Assets/Images/hero.png";
import Register_img from "../Assets/Images/Register.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../Redux/Action/User";
import { useEffect } from "react";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import { CREATE_USER_RESET } from "../../Redux/Constants";

const Register = () => {
  const dispatch = useDispatch();
  const { createUser } = useSelector((state) => state);
  const navigate = useNavigate()
  const { success, error } = createUser;
  const initialValue = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  };

  const [input, setInput] = useState(initialValue);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(input)

  const createUserHandler = () => {
    dispatch(
      registerUserAction({
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        email: input.email,
        password: input.password,
        address: input.address,
        phoneNumber: input.phoneNumber,
      })
    );
  };

  useEffect(()=>{
    if(success){
      toast.success("Registration Successful")
      setTimeout(()=>{
        navigate("/login")
      },2000)
    }

    if(error){
      toast.error(`${error}`)
      setTimeout(()=>{
        dispatch({type:CREATE_USER_RESET})
      },2000)
    }
  })
  return (
    <div className="m-0 p-0">
      <div className="flex justify-start items-center gap-2 pb-8 pt-2 ml-8">
        <img src={Logo} alt="" className="w-[60px] h-[60px]" />
        <h2 className="font-inter font-bold text-3xl">
          E-Li<span className="text-green-500">bra</span>ry
        </h2>
      </div>
      <div className="flex justify-center items-center">
        <div className=" hidden md:flex w-[600px] h-[500px] shadow-2xl">
          <div className="w-5/6 mx-auto">
            <img src={Register_img} alt="" className="w-full h-full bg-cover" />
          </div>
        </div>
        <div className="w-[500px] md:w-[700px] h-[500px]">
          <div className="w-5/6 mx-auto">
            <form className="relative border border-gray-100 space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10">
              <h1 className="pb-6 text-2xl text-green-600 font-inter text-center font-semibold lg:text-3xl">
                Register
              </h1>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className=""> First Name </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your Name"
                    onChange={changeHandler}
                    value={input.firstName}
                    className="mt-2 focus:outline-green-500 h-12 w-full rounded-md bg-gray-100 px-3"
                  />
                </div>
                <div>
                  <label className=""> Last Name </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={input.lastName}
                    onChange={changeHandler}
                    className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
                  />
                </div>
              </div>
              <div>
                <label className=""> Username </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={input.username}
                  onChange={changeHandler}
                  className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
                />
              </div>
              <div>
                <label className=""> Email Address </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Info@example.com"
                  value={input.email}
                  onChange={changeHandler}
                  className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
                />
              </div>
              <div>
                <label className=""> Password </label>
                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  value={input.password}
                  onChange={changeHandler}
                  className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
                />
              </div>
              <div>
                <label className=""> Address </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={changeHandler}
                  className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
                />
              </div>

              <div>
                <label className=""> Phone: </label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+234 5445 0543"
                  value={input.phoneNumber}
                  onChange={changeHandler}
                  className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
                />
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={createUserHandler}
                  className="mt-5 w-full rounded-md bg-green-600 hover:bg-green-300 p-3 text-center font-semibold text-white"
                >
                  Get Started
                </button>
              </div>
              <p className="text-right font-semibold text-sm pt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="italic underline text-green-700 underline-offset-8">
                    Login
                  </span>
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

<div className="w-10/12 mx-12 h-full flex justify-center items-center gap-6">
  <div className="flex-[700px] h-[400px]">
    <h2 className="font-inter text-6xl pb-4 font-bold pt-10">
      Bringing Li<span className="text-purple-500">bra</span>ry
    </h2>
    <h2 className="font-inter text-6xl font-bold pb-4">Closer To You</h2>
  </div>
</div>;
