import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "./../toast";
import { validateEmail, validatePasswordLength } from "../../utils/validation";
import { useLoginMutation } from "./../../Redux/user/userApiSlice";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/user/userSlice";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    function checkisLogin() {
      const userLoginCookie = Cookies.get("userLogin");
      const isLogin = userLoginCookie ? JSON.parse(userLoginCookie) : false;
      if (isLogin) {
        navigate("/");
      }
    }
    checkisLogin();
  }, [navigate]);

  const handleSignIn = async () => {
    if (!email | !password) {
      toastError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      toastError("Please enter a valid email address.");
      return;
    }

    if (!validatePasswordLength(password)) {
      toastError("Password must be at least 6 characters.");
    }

    await login({ email, password }).then((response) => {
      if (response.data.status === 200) {
        Cookies.set(
          "userLogin",
          JSON.stringify({
            login: true,
            userid: response.data.userdetails.id,
            token: response.data.userdetails.token,
          }),
          {
            expires: 30, // Expires in 30 days
            secure: true, // Set the secure flag
          }
        );

        const userLoginCookie = Cookies.get("userLogin");
        const userLoginData = JSON.parse(userLoginCookie || "{}");

        if (userLoginData.token && userLoginData.userid) {
          toastSuccess(response.data.message);
          dispatch(loginUser(response.data.userdetails));
          navigate("/");
        }
      } else {
        toastError(response.data.message);
        navigate("/login");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-10 py-2 h-5/6" >
      {/* Left Div */}
      <div
        className="bg-cover bg-center hidden sm:block"
        style={{
          backgroundImage: 'url("/Assets/loginBanner.jpg")',
          borderRadius: "10px",
        }}
      >
        {/* Content for the left div */}
      </div>

      {/* Right Div */}
      <div className="border border-1 border-black rounded-lg p-2" >
        {/* Content for the right div */}
        <div className="bg-white p-2 rounded-lg">
          <p
            tabIndex="0"
            className="focus:outline-none text-2xl text-center font-bold font-sans leading-6 text-gray-800"
          >
            Welcome Back
          </p>

          <div className="py-10">
            <label
              id="email"
              className="text-lg font-sans font-medium leading-none text-gray-800"
            >
              Email
            </label>
            <input
              aria-labelledby="email"
              type="email"
              placeholder="Enter Your valid E-mail address"
              className="border border-black rounded text-xs md:text-sm font-medium leading-none py-3 w-full pl-3 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="mt-6  w-full">
              <label
                htmlFor="password"
                className="text-lg font-sans font-mediumleading-none text-gray-800"
              >
                Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="pass"
                  type="password"
                  placeholder="Enter your password"
                  className="border border-black rounded  text-xs font-medium leading-none py-3 w-full pl-3 mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <p
              className="text-blue-700 float-right my-5 cursor-pointer"
              onClick={() => navigate("/forgetpassword")}
            >
              Forget Password?
            </p>
            <div className="mt-8 my-7">
              <button
                style={{ backgroundColor: "#272829" }}
                className="focus:ring-2 focus:ring-offset-2 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
            <p
              tabIndex="0"
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              Don't Have an account
              <Link
                to="/signup"
                className="text-lg  text-blue-800 cursor-pointer"
              >
                &nbsp; Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
