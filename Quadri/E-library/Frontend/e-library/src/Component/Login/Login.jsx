import Logo from "../Assets/Images/hero.png";
import Login_img from "../Assets/Images/Login.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../Redux/Action/User";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER_RESET } from "../../Redux/Constants";
import { PiEyeSlashDuotone } from "react-icons/pi";
import { LuEye } from "react-icons/lu";
import Spinner from "../Spinner/Spinner";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state);
  const { success, error, user, loading } = loginUser;
  const initialValue = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(initialValue);
  const [showPassword, setShowPassword] = useState("password");

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLoginHandler = () => {
    dispatch(loginUserAction({ email: input.email, password: input.password }));
  };

  useEffect(() => {
    if (success) {
      toast.success(`Welcome!${user.firstName}`);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({
          type: LOGIN_USER_RESET,
        });
      });
    }
  }, [success, error]);
  return (
    <div className="p-0 m-0 h-[100vh">
      <div className="flex justify-start items-center gap-2 pb-8 pt-2 ml-8">
        <img src={Logo} alt="" className="w-[60px] h-[60px]" />
        <h2 className="font-inter font-bold text-3xl">
          E-Li<span className="text-green-500">bra</span>ry
        </h2>
      </div>
      <div className="w-[94%] mx-auto">
        <div className="flex justify-center items-center">
          <div className="hidden md:flex w-[600px] h-[450px] shadow-2xl">
            <div className="w-5/6 mx-auto">
              <img src={Login_img} alt="" className="w-full h-full bg-cover" />
            </div>
          </div>
          <div className="w-[600px] h-[450px]">
            <div className="w-5/6 mx-auto">
              <div className="p-2">
                <div className="flex w-full flex-col space-y-5 rounded-lg border py-10 px-5 shadow-lg mx-auto">
                  <div className="mx-auto mb-2 space-y-3">
                    <h1 className=" text-3xl font-bold text-center text-green-700">
                      E-Library
                    </h1>
                    <p className="text-gray-500">
                      Login to access your account
                    </p>
                  </div>

                  <div>
                    <div className="relative mt-2 w-full">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={changeHandler}
                        className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0"
                        placeholder="email@gmail.com"
                      />
                      <label
                        htmlFor="email"
                        className="absolute  top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none px-2 text-sm bg-white font-semibold text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600"
                      >
                        {" "}
                        Enter Your Email{" "}
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="relative mt-2 w-full">
                      <input
                        type={showPassword}
                        id="password"
                        name="password"
                        onChange={changeHandler}
                        className="border-6  peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0"
                        placeholder=" "
                      />
                      <label
                        htmlFor="password"
                        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white font-semibold px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-600"
                      >
                        {" "}
                        Enter Your Password
                      </label>
                      {showPassword === "password" ? (
                        <div
                          onClick={() => setShowPassword("text")}
                          className="absolute top-4 right-4 cursor-pointer"
                        >
                          <PiEyeSlashDuotone className="text-2xl" />
                        </div>
                      ) : (
                        <div
                          onClick={() => setShowPassword("password")}
                          className="absolute top-4 right-4 cursor-pointer"
                        >
                          <LuEye className="text-2xl" />
                        </div>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button
                      onClick={userLoginHandler}
                      className="rounded-lg bg-green-600 hover:bg-green-300 py-3 font-bold text-white"
                    >
                      Login
                    </button>
                  )}

                  <p className="text-sm font-semibold font-inter">
                    Don't have an account?{" "}
                    <Link to="/register">
                      {" "}
                      <span className="italic underline text-green-500">
                        Register
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
