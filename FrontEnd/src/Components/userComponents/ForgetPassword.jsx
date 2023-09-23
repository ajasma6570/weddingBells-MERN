import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../toast";
import {
  useMobileOTPMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
} from "../../Redux/user/userApiSlice";
import { validatePasswordLength, validatePhone } from "../../utils/validation";

export default function ForgetPassword() {
  const [check, setCheck] = useState(true);
  const [verify, setVerify] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");

  const [MobileOTP] = useMobileOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const [resetPassword] = useResetPasswordMutation();

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const handleRequest = async () => {
    if (!phone) {
      toastError("please Enter your 10 digit number");
      return;
    }

    if (!validatePhone(phone)) {
      toastError("Enter 10 digit number");
      return;
    }

    const res = await MobileOTP({ phone });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setCheck(false);
    } else {
      toastError(res.data.message);
    }
  };

  const handleVerify = async () => {
    if (!OTP) {
      toastError("Enter 4 digit OTP ");
      setCheck(false);
      return;
    }

    if (OTP.length !== 4) {
      toastError("OTP must be 4 digit");
      setCheck(false);
      return;
    }

    const res = await verifyOTP({ OTP, phone });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setCheck(false);
      setVerify(false);
    } else {
      toastError(res.data.message);
      navigate("/login");
    }
  };

  const handleResend = async () => {
    const res = await MobileOTP({ phone });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setCountdown(30);
      setCheck(false);
    } else {
      toastError(res.data.message);
    }
  };

  const handleChangePassword = async () => {
    if (!password | !CPassword) {
      toastError("Please fill in all fields");
      return;
    }

    if (!validatePasswordLength(password)) {
      toastError("Password must be at least 6 characters.");
      return;
    }

    if (password !== CPassword) {
      toastError("Passwords do not match.");
      return;
    }

    const res = await resetPassword({ phone, password });

    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      navigate("/login");
    } else {
      toastError(res.data.message);
      navigate("login");
    }
  };

  useEffect(() => {
    if (!check && verify && countdown > 0) {
      // Start the countdown when check is false and verify is true
      startCountdown();
    }
  }, [check, verify, countdown]);

  const startCountdown = () => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); // Decrease countdown every second
    } else {
      toastError("OTP Expired");
    }
  };

  return (
    <div className="w-full py-10">
      <div className="container mx-auto py-5">
        <div className="flex justify-center items-center h-full">
          <div className="lg:flex md:flex w-full px-4 sm:px-8 lg:px-16">
            {/* Left Div */}
            <div
              className="md:w-1/2 w-full border border-1 border-black bg-cover bg-center hidden sm:block"
              style={{
                backgroundImage: 'url("/Assets/loginBanner.jpg")',
                borderRadius: "10px",
              }}
            >
              {/* Content for the left div */}
            </div>

            {/* Right Div */}
            <div className="md:w-1/2 w-full border border-1 border-black rounded-lg p-4 md:p-10">
              {/* Content for the right div */}
              {check && verify && (
                <div className="bg-white p-2 rounded-lg">
                  <p className="text-2xl text-center font-bold font-sans leading-6 text-gray-800">
                    Forget Password
                  </p>

                  <div className="py-5">
                    <label className="text-sm font-sans font-medium leading-none text-gray-800">
                      Enter Phone Number
                    </label>
                    <input
                      aria-labelledby="email"
                      type="email"
                      placeholder="Enter Your valid Phone number"
                      className="border border-black rounded text-xs md:text-sm font-medium leading-none h-8 w-full pl-3 mt-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      style={{
                        backgroundColor: "#272829",
                      }}
                      className="focus:ring-2 focus:ring-offset-2 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-2 w-full"
                      onClick={handleRequest}
                    >
                      Request OTP
                    </button>
                  </div>

                  <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                    Back to Login Page
                    <Link
                      to="/login"
                      className="hover:text-gray-500 ml-1 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-blue-800 cursor-pointer"
                    >
                      Click here
                    </Link>
                  </p>
                </div>
              )}

              {!check && verify && (
                <div className="bg-white p-2 rounded-lg">
                  <p className="text-2xl text-center font-bold font-sans leading-6 text-gray-800">
                    Verify OTP
                  </p>

                  <div className="py-5">
                    <label className="text-sm font-sans font-medium leading-none text-gray-800">
                      Enter your OTP
                    </label>
                    <input
                      aria-labelledby="email"
                      type="email"
                      placeholder="Enter your 4-digit OTP number"
                      className="border border-black rounded text-xs md:text-sm font-medium leading-none h-8 w-full pl-3 mt-2"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      style={{
                        backgroundColor: "#272829",
                      }}
                      className="focus:ring-2 focus:ring-offset-2 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-2 w-full"
                      onClick={countdown === 0 ? handleResend : handleVerify}
                    >
                      {countdown === 0
                        ? "Resend OTP"
                        : `Verify (${countdown}s)`}
                    </button>
                  </div>
                </div>
              )}

              {!check && !verify && (
                <div className="bg-white p-2 rounded-lg">
                  <p className="text-2xl text-center font-bold font-sans leading-6 text-gray-800">
                    New Password
                  </p>

                  <div className="py-5">
                    <label className="text-sm font-sans font-medium leading-none text-gray-800">
                      Enter new Password
                    </label>
                    <input
                      aria-labelledby="email"
                      type="password"
                      placeholder="Password must be at least 6 characters"
                      className="border border-black rounded text-xs md:text-sm font-medium leading-none h-8 w-full pl-3 mt-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="py-5">
                    <label className="text-sm font-sans font-medium leading-none text-gray-800">
                      Confirm Password
                    </label>
                    <input
                      aria-labelledby="email"
                      type="password"
                      placeholder="Confirm your password"
                      className="border border-black rounded text-xs md:text-sm font-medium leading-none h-8 w-full pl-3 mt-2"
                      value={CPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      style={{
                        backgroundColor: "#272829",
                      }}
                      className="focus:ring-2 focus:ring-offset-2 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-2 w-full"
                      onClick={handleChangePassword}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
