import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBusinessLoginMutation } from "./../../Redux/Business/businessApiSlice";
import { loginBusinessAccount } from "../../Redux/Business/businessSlice";
import { toastError, toastSuccess, toastWarning } from "../toast";
import { validateEmail, validatePasswordLength } from "../../utils/validation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function BusinessLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [BusinessLogin] = useBusinessLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignin = async () => {
    if (!email | !password) {
      toastError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toastError("Please enter a valid email address.");
      return;
    }

    if (!validatePasswordLength(password)) {
      toastError("Password must be at least 6 characters.");
      return;
    }

    const res = await BusinessLogin({ email, password });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);

      Cookies.set(
        "businessLogin",
        JSON.stringify({
          login: true,
          busienessId: res.data.Businessdetails.id,
          token: res.data.Businessdetails.token,
        }),
        {
          expires: 30, // Expires in 30 days
          secure: true, // Set the secure flag
        }
      );

      dispatch(loginBusinessAccount(res.data.Businessdetails));
      navigate("/business/dashboard");
    } else {
      toastError(res.data.message);
      navigate("/business/login");
    }
  };

  useEffect(() => {
    function checkAnyLogin() {
      const userLoginCookie = Cookies.get("userLogin");
      const isLogin = userLoginCookie ? JSON.parse(userLoginCookie) : false;

      if (isLogin) {
        toastWarning(
          "Please log out of the currently logged-in account and Try again!!"
        );
        navigate("/");
      }
    }
    checkAnyLogin();
  }, [navigate]);

  return (
    <>
      <div className="  w-full  ">
        <div className="container mx-auto py-5 h-full">
          <div className="flex justify-center items-center h-full">
            <div className="w-96 border border-1 flex justify-center border-black rounded-lg p-5 ">
              <div className="bg-white p-2 rounded-lg w-96">
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
                    className=" border border-black rounded text-xs md:text-sm font-medium leading-none py-3 w-full pl-3 mt-2"
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
                  {/* <p className="text-blue-700 float-right my-5" >
                      Forget Password?
                    </p> */}
                  <div className="mt-8 my-7">
                    <button
                      //style={{ backgroundColor: "rgba(205, 165, 34, 0.77)" }}
                      className="focus:ring-2 dark:bg-gray-800 focus:ring-offset-2 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                      onClick={handleSignin}
                    >
                      Sign In
                    </button>
                  </div>
                  <p
                    tabIndex="0"
                    className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                  >
                    Don’t Have an account
                    <Link
                      to="/business/signup"
                      className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-lg font-medium leading-none  text-blue-800 cursor-pointer"
                    >
                      &nbsp;Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
