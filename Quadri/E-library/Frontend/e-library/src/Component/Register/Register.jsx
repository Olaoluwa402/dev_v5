import Logo from "../Assets/Images/hero.png"
import Register_img from "../Assets/Images/Register.jpg"
import {Link} from "react-router-dom"

const Register = () => {
  return (
    <div className="m-0 p-0">
     <div className="flex justify-start items-center gap-2 pb-8 pt-2 ml-8">
        <img src={Logo} alt=""  className="w-[60px] h-[60px]"/>
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
        <div  className="w-[500px] md:w-[700px] h-[500px]">
        <div className="w-5/6 mx-auto">
          <form className="relative border border-gray-100 space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10">
            <h1 className="pb-6 text-2xl text-green-600 font-inter text-center font-semibold lg:text-3xl">Register</h1>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className=""> First Name </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="mt-2 focus:outline-green-500 h-12 w-full rounded-md bg-gray-100 px-3"
                />
              </div>
              <div>
                <label className=""> Last Name </label>
                <input
                  type="text"
                  placeholder="Last  Name"
                  className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
                />
              </div>
            </div>
            <div>
              <label className=""> Username </label>
              <input
                type="text"
                placeholder="Username"
                className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
              />
            </div>
            <div>
              <label className=""> Email Address </label>
              <input
                type="email"
                placeholder="Info@example.com"
                className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
              />
            </div>
            <div>
              <label className=""> Password </label>
              <input
                type="password"
                placeholder="******"
                className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
              />
            </div>
            <div>
              <label className=""> Address </label>
              <input
                type="text"
                placeholder="Address"
                className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
              />
            </div>

            <div>
              <label className=""> Phone: </label>
              <input
                type="text"
                placeholder="+234 5445 0543"
                className="mt-2 h-12 w-full focus:outline-green-500 rounded-md bg-gray-100 px-3"
              />
            </div>

            <div className="mb-4">
              <button
                type="button"
                className="mt-5 w-full rounded-md bg-green-600 hover:bg-green-300 p-3 text-center font-semibold text-white"
              >
                Get Started
              </button>
            </div>
            <p className="text-right font-semibold text-sm pt-4">
              Already have an account?{" "}
              <Link to="/login">
                <span className="italic underline text-green-700 underline-offset-8">Login</span>
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
       
      </div> 