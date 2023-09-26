import React, { useEffect, useState } from "react";
import "../userComponents/custom_style.css";
import {
  useBusinessCreateAccountOTPMutation,
  useBusinessSignupMutation,
  useBusinessVerifyOTPMutation,
} from "../../Redux/Business/businessApiSlice";
import {
  validateEmail,
  validatePasswordLength,
  validatePhone,
  validatePincode,
} from "../../utils/validation";
import { toastError, toastSuccess } from "../toast";
import { useNavigate } from "react-router-dom";

export default function BusinessSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [phonePage, setPhonePage] = useState(true);
  const [verifyPage, setVerifyPage] = useState(false);
  const [detailsPage, setDetailspage] = useState(false);

  const [BusinessSignup] = useBusinessSignupMutation();
  const [BusinessCreateAccountOTP] = useBusinessCreateAccountOTPMutation();
  const [BusinessVerifyOTP] = useBusinessVerifyOTPMutation();
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      if (
        !name |
        !email |
        !phone |
        !address |
        !city |
        !state |
        !pincode |
        !password |
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

      const res = await BusinessSignup({
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        password,
      });
      if (res.data.status === 200) {
        toastSuccess(res.data.message);
        navigate("/business/login");
      } else {
        toastError(res.data.message);
        navigate("/business/signup");
      }
    } catch (err) {
      toastError(err?.data?.message || err.error);
    }
  };

  const handleRequestOTP = async () => {
    if (!phone) {
      toastError("Please fill in all fields.");
      return;
    }

    if (!validatePhone(phone)) {
      toastError("Please enter 10 digits phone number.");
      return;
    }

    const res = await BusinessCreateAccountOTP({ phone });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setPhonePage(false);
      setVerifyPage(true);
    } else {
      toastError(res.data.message);
      return;
    }
  };

  const handleResend = async () => {
    const res = await BusinessCreateAccountOTP({ phone });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setCountdown(30);
      setVerifyPage(true);
    } else {
      toastError(res.data.message);
      return;
    }
  };

  const handleVerify = async () => {
    if (!OTP) {
      toastError("Please fill in all fields.");
      return;
    }

    if (OTP.length !== 4) {
      toastError("OTP must be 4 digit");
      return;
    }

    const res = await BusinessVerifyOTP({ OTP, phone });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setVerifyPage(false);
      setDetailspage(true);
    } else {
      toastError(res.data.message);
      navigate("/business/login");
      return;
    }
  };

  useEffect(() => {
    const startCountdown = () => {
      if (countdown > 0) {
        setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000); // Decrease countdown every second
      } else {
        toastError("OTP Expired");
      }
    };

    if (verifyPage && countdown > 0) {
      // Start the countdown when check is false and verify is true
      startCountdown();
    }
  }, [verifyPage, countdown]);

  return (
    <>
      <section className=" p-3">
        <div className="container mx-auto py-5 h-full">
          <div className="flex justify-center items-center h-full">
            <div className="lg:flex md:flex px-8">
              <div className=" w-full border border-1 border-black rounded-lg ">
                <div className="bg-white p-2 rounded-lg">
                  <h3 className="mb-5 text-2xl text-center uppercase">
                    Create Business Account
                  </h3>

                  {phonePage && (
                    <>
                      <div className="mb-4 ">
                        <div className="relative">
                          <input
                            type="number"
                            id="form3Example8"
                            className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your 10 digit phone number"
                          />
                        </div>
                      </div>

                      <div className="flex justify-center pt-3 pb-10">
                        <button
                          className="btn  bg-gray-800 ms-2 p-3 text-sm w-full text-white font-sans "
                          onClick={handleRequestOTP}
                        >
                          Request OTP
                        </button>
                      </div>
                    </>
                  )}

                  {verifyPage && (
                    <>
                      <div className="mb-4 ">
                        <div className="relative">
                          <input
                            type="number"
                            id="form3Example8"
                            className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                            name="OTP"
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            placeholder="Enter your 4 digit OTP"
                          />
                        </div>
                      </div>

                      <div className="flex justify-center pt-3 pb-10">
                        <button
                          style={{ backgroundColor: "#272829" }}
                          className="focus:ring-2 focus:ring-offset-2  text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                          onClick={
                            countdown === 0 ? handleResend : handleVerify
                          }
                        >
                          {countdown === 0
                            ? "Resend OTP"
                            : `Verify (${countdown}s)`}
                        </button>
                      </div>
                    </>
                  )}

                  {detailsPage && (
                    <>
                      <div className="mb-4 grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="text"
                              id="nameInput"
                              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder=" Enter your Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="text"
                              id="form3Example1m1"
                              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400   placeholder-black"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your Email"
                            />
                          </div>
                        </div>
                      </div>
                      {/* 
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="number"
                        id="form3Example8"
                        className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your 10 digit phone number"
                      />
                    </div>
                  </div> */}

                      <div className="mb-4">
                        <div className="relative">
                          <input
                            type="text"
                            id="form3Example9"
                            className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder=" Enter your full address"
                          />
                        </div>
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="text"
                              id="form3Example1m"
                              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 placeholder-black"
                              name="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="Enter City Name"
                              style={{ "::placeholder": { color: "black" } }}
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="text"
                              id="form3Example1n"
                              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                              name="state"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              placeholder="Enter State name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="relative">
                          <input
                            type="text"
                            id="form3Example90"
                            className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                            name="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder=" Enter your Pincode"
                          />
                        </div>
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="password"
                              id="password"
                              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter your Password"
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="password"
                              id="form3Example1n"
                              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400  placeholder-black"
                              name="Cpassword"
                              value={Cpassword}
                              onChange={(e) => setCPassword(e.target.value)}
                              placeholder="Confirm Password"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center pt-3">
                        <button
                          className="btn  bg-gray-800 ms-2 p-3 text-2xl w-full text-white font-sans "
                          onClick={handleSignup}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
