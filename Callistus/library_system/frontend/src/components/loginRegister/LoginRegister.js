import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../spinner/CustomSpinner.jsx";
import { createUserAction } from "../../redux/actions/user/user.js";
import { CREATE_USER_CLEAR_ERROR } from "../../redux/constants/user/user.js";

const LoginRegister = ({ register, login }) => {
  const dispatch = useDispatch();
  const {
    createdUser: { error, user, success, loading },
  } = useSelector((state) => state);

  //   const { error, success, user } = loginUser;
  //const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
    email: "",
    remember: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (success) {
      toast.success(`welcome${user.username}`);
    }
    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: CREATE_USER_CLEAR_ERROR });
      }, 3000);
    }
  }, [dispatch, error, user, success]);

  async function LoginHandler() {
    //dispatch(loginUserAction({ email: value.email, password: value.password }));
  }

  async function RegisterHandler() {
    dispatch(
      createUserAction({
        username: value.username,
        email: value.email,
        password: value.password,
      })
    );
  }
  return (
    <div>
      <div className="flex w-screen flex-wrap text-slate-800">
        <div className="relative hidden h-screen select-none flex-col justify-center bg-blue-600 text-center md:flex md:w-1/2">
          <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
            <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600">
              New Feature
            </span>
            <p className="my-6 text-3xl font-semibold leading-10">
              Create animations with{" "}
              <span className="mx-auto block w-56 whitespace-nowrap rounded-lg bg-orange-400 py-2 text-white">
                drag and drop
              </span>
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              necessitatibus nostrum repellendus ab totam.
            </p>
            <a
              href="/"
              className="font-semibold tracking-wide text-white underline underline-offset-4"
            >
              Learn More
            </a>
          </div>
          {/* <!-- <img className="mx-auto w-11/12 max-w-lg rounded-lg object-cover" src="/images/SoOmmtD2P6rjV76JvJTc6.png" /> --> */}
        </div>
        <div className="flex w-full flex-col md:w-1/2">
          <div className=" mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p className="text-center text-3xl font-bold md:text-left md:leading-tight">
              Create your free account
            </p>

            <div className="flex flex-col items-stretch pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                {register && (
                  <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={changeHandler}
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Name"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={changeHandler}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={changeHandler}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password (minimum 8 characters)"
                  />
                </div>
              </div>
              <div className="block">
                <input
                  className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-blue-600 focus:border-blue-600 focus:shadow"
                  type="checkbox"
                  id="remember"
                  name="remember"
                  onChange={changeHandler}
                  checked
                />
                <label className="inline-block" htmlFor="remember">
                  {" "}
                  I agree to the{" "}
                  <a className="underline" href="/">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {login ? (
                <div>
                  <button
                    onClick={LoginHandler}
                    type="submit"
                    className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                  >
                    Sign in
                  </button>
                  {/* {isLoading.login ? (
                    <Spinner />
                  ) : (
                    <button
                      onClick={LoginHandler}
                      type="submit"
                      className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                    >
                      Sign in
                    </button>
                  )} */}
                </div>
              ) : (
                <div>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button
                      onClick={RegisterHandler}
                      type="submit"
                      className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                    >
                      Register
                    </button>
                  )}
                </div>
              )}

              {login ? (
                <p>Don't have an account? Register</p>
              ) : (
                <p>Already have an account? Login</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;