import React, { useEffect, useState } from "react";
import "./custom_style.css";

import { toastSuccess, toastError } from "./../toast";
import {
  validateEmail,
  validatePasswordLength,
  validatePhone,
  validatePincode,
} from "../../utils/validation";
import { useSignupMutation, useVerifyOTPMutation ,useCreateAccountOTPMutation} from "./../../Redux/user/userApiSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [requestOTP, setrequestOTP] = useState(true);
  const [verifiedOTP, setVerifiedOTP] = useState(false);
  const [accountDetails, setAccountDetails] = useState(false);

  const [userSignUp] = useSignupMutation();
  const navigate = useNavigate();

  const [mobileOTP] = useCreateAccountOTPMutation()
  const [verifyOTP] = useVerifyOTPMutation()

  const handleSubmit = async () => {
    try {
      if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !state ||
        !pincode ||
        !password ||
        !Cpassword
      ) {
        toastError("Please fill in all fields.");
        return;
      }

      if (!validateEmail(email)) {
        toastError("Please enter a valid email address.");
        return;
      }

      if (!validatePhone(phone)) {
        toastError("Please enter 10 digits phone number.");
        return;
      }

      if (!validatePasswordLength(password)) {
        toastError("Password must be at least 6 characters.");
        return;
      }

      if (!validatePincode(pincode)) {
        toastError("Please enter 6 digit pincode");
      }

      if (password !== Cpassword) {
        toastError("Passwords do not match.");
        return;
      }

      const response = await userSignUp({
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        password,
      });
      if (response.data.status === 200) {
        toastSuccess(response.data.message);
        navigate("/");
      } else {
        toastError(response.data.message);
        navigate("/signup");
      }
    } catch (err) {
      toastError(err?.data?.message || err.error);
    }
  };
  
  const handleRequest = async() => {
    if (!phone ) {
      toastError("Please fill in all fields.");
      return;
    }

    if (!validatePhone(phone)) {
      toastError("Please enter 10 digits phone number.");
      return;
    }

    const res = await mobileOTP({phone})
    console.log(res);
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setrequestOTP(false)
      setVerifiedOTP(true)
    } else {
      toastError(res.data.message);
      return;
    }

    
  }

  const handleResend = async() => {
    const res = await mobileOTP({ phone });
    console.log(res);
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setCountdown(30);
    } else {
      toastError(res.data.message);
      return;
    }
    
  }

  const handleVerify = async() => {
    if (!OTP ) {
      toastError("Please fill in all fields.");
      return;
    }

    if (OTP.length !== 4) {
      toastError("OTP must be 4 digit");
      return;
    }

    const res = await verifyOTP({ OTP, phone });
    console.log(res);
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setVerifiedOTP(false)
      setAccountDetails(true)
    } else {
      toastError(res.data.message);
      navigate("/login");
      return;
  }

    
  }

  useEffect(() => {
    if (!requestOTP && verifiedOTP && countdown > 0) {
      // Start the countdown when check is false and verify is true
      startCountdown();
    }
  }, [requestOTP, verifiedOTP, countdown]);

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-10 py-2 ">
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
        <div className="border border-1 border-black rounded-lg p-2">
          {/* Content for the right div */}
          <div className="bg-white p-2 rounded-lg">
            <p
              tabIndex="0"
              className="focus:outline-none text-2xl text-center font-bold font-sans leading-6 text-gray-800"
            >
              Create Account
            </p>

            <div className="py-5">

              {requestOTP && <>
                <div className="pt-3 w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="phone"
                    type="number"
                    placeholder="Enter your phone number"
                    className="border border-black rounded  text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black "
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <button
                  style={{ backgroundColor: "#272829" }}
                  className="focus:ring-2 focus:ring-offset-2  text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                  onClick={handleRequest}
                >
                  Request OTP
                </button>
              </div>

              </>}

              {verifiedOTP && <>
                <div className="pt-3 w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="OTP"
                    type="number"
                    placeholder="Enter your 4 digit OTP"
                    className="border border-black rounded  text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black "
                    value={OTP}
                    onChange={(e)=>setOTP(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <button
                  style={{ backgroundColor: "#272829" }}
                  className="focus:ring-2 focus:ring-offset-2  text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                  onClick={countdown === 0 ? handleResend : handleVerify}
                >
                   {countdown === 0
                        ? "Resend OTP"
                        : `Verify (${countdown}s)`}
                </button>
              </div>

              </>}

              {accountDetails &&  <>
               <input
                aria-labelledby="Name"
                type="text"
                placeholder="Enter Your Name"
                className="border border-black rounded text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />

              <div className=" pt-3  w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your Valid E-mail address "
                    className="border border-black rounded  text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* <div className="pt-3 w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="phone"
                    type="number"
                    placeholder="Enter your phone number"
                    className="border border-black rounded  text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black "
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>
              </div> */}

              <div className="pt-3 placeholder-black w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="Address"
                    type="text"
                    placeholder="Enter your Address"
                    className="border border-black rounded  text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black "
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="pt-3 placeholder-black w-1/2 pr-2">
                  <div className="relative flex items-center justify-center">
                    <input
                      id="city"
                      type="text"
                      placeholder="Enter your city"
                      className="border border-black rounded text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black"
                      value={city}
                      onChange={(e)=>setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-3 placeholder-black w-1/2 pl-2">
                  <div className="relative flex items-center justify-center">
                    <input
                      id="state"
                      type="text"
                      placeholder="Enter your state"
                      className="border border-black rounded text-xs md:text-sm font-medium leading-none py-2 w-full pl-3 placeholder-black"
                      value={state}
                      onChange={(e)=>setState(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 placeholder-black w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="pincode"
                    type="number"
                    placeholder="Enter your pincode"
                    className="border border-black rounded md:text-sm  text-xs font-medium leading-none py-2 w-full pl-3 placeholder-black mt-2"
                    value={pincode}
                    onChange={(e)=>setPincode(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-3 placeholder-black w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="border border-black rounded md:text-sm  text-xs font-medium leading-none py-2 w-full pl-3 placeholder-black"
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-3 placeholder-black w-full">
                <div className="relative flex items-center justify-center">
                  <input
                    id="pass"
                    type="password"
                    placeholder="Enter your Confirm password"
                    className="border border-black rounded md:text-sm  text-xs font-medium leading-none py-2 w-full pl-3 placeholder-black"
                    value={Cpassword}
                    onChange={(e)=>setCPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3">
                <button
                  style={{ backgroundColor: "#272829" }}
                  className="focus:ring-2 focus:ring-offset-2  text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </> }
             
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
