import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from '../toast';
import { validatePasswordLength, validatePhone } from '../../utils/validation';
import {useBusinessMobileOTPMutation, useBusinessVerifyOTPMutation, useBusinessResetPasswordMutation} from '../../Redux/Business/businessApiSlice'

export default function ForgetPassword() {

    const [requestPage, setRequestpage] = useState(true)
    const [verifyPage, setVerifyPage] =useState(false)
    const [newPasswordPage, setnewPasswordPage] = useState(false)
    const [countdown, setCountdown] = useState(30);
    const [phone, setPhone] = useState("");
    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");
    const navigate = useNavigate()

    const [BusinessmobileOTP] = useBusinessMobileOTPMutation();
    const [BusinessverifyOTP] = useBusinessVerifyOTPMutation();
    const [BusinessresetPassword] = useBusinessResetPasswordMutation();

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
    

      const handleRequestOTP = async() => {
        if (!phone) {
            toastError("please Enter your 10 digit number");
            return;
          }
      
          if (!validatePhone(phone)) {
            toastError("Enter 10 digit number");
            return;
          }

          const res = await BusinessmobileOTP({phone});
          if (res.data.status === 200) {
            toastSuccess(res.data.message);
            setRequestpage(false);
            setVerifyPage(true);
          } else {
            toastError(res.data.message);
            return;
          }
      }

      const handleResend = async() => {
        const res = await BusinessmobileOTP({ phone });
        if (res.data.status === 200) {
          toastSuccess(res.data.message);
          setCountdown(30);
          setVerifyPage(true);
        } else {
          toastError(res.data.message);
          return;
        }
      }

      const handleVerify = async() => {
        if (!OTP) {
          toastError("Enter 4 digit OTP ");
          return;
        }
    
        if (OTP.length !== 4) {
          toastError("OTP must be 4 digit");
          return;
        }

        const res = await BusinessverifyOTP({ OTP, phone });
        if (res.data.status === 200) {
          toastSuccess(res.data.message);
          setVerifyPage(false);
          setnewPasswordPage(true);
        } else {
          toastError(res.data.message);
          navigate("/business/login");
        }
      }

      const handleChangePassword = async() => {
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

        const res = await BusinessresetPassword({phone, password});
        if (res.data.status === 200) {
          toastSuccess(res.data.message);
          navigate("/business/login");
        } else {
          toastError(res.data.message);
          return;
        }
      }

  return (
    <>

    <div className="  w-full  ">
        <div className="container mx-auto py-5 h-full">
          <div className="flex justify-center items-center h-full">
            <div className="w-96 border border-1 flex justify-center border-black rounded-lg p-5 ">

            {requestPage &&
              <div className="bg-white p-2 rounded-lg w-96">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-2xl text-center font-bold font-sans leading-6 text-gray-800"
                >
                  Forget Password
                </p>

          
                <div className="py-10">
                  <label
                    id="number"
                    className="text-lg font-sans font-medium leading-none text-gray-800"
                  >
                    Phone Number
                  </label>
                  <input
                    aria-labelledby="number"
                    type="text"
                    placeholder="Enter Your valid phone number"
                    className=" border border-black rounded text-xs md:text-sm font-medium leading-none py-3 w-full pl-3 mt-2"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
               
                  <div className="mt-8 my-7">
                    <button
                      className="focus:ring-2 dark:bg-gray-800 focus:ring-offset-2 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                        onClick={handleRequestOTP}
                    >
                      Request OTP
                    </button>
                  </div>
                  <p
                    tabIndex="0"
                    className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                  >
                    Back to Login page ?
                    <Link
                      to="/business/login"
                      className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-blue-800 cursor-pointer"
                    >
                      &nbsp;Click here
                    </Link>
                  </p>
                </div>
              </div>
            }


            {verifyPage &&
              <div className="bg-white p-2 rounded-lg w-96">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-2xl text-center font-bold font-sans leading-6 text-gray-800"
                >
                  Verify OTP
                </p>

          
                <div className="py-10">
                  <label
                    id="number"
                    className="text-lg font-sans font-medium leading-none text-gray-800"
                  >
                   Enter your OTP
                  </label>
                  <input
                    aria-labelledby="number"
                    type="text"
                    placeholder="Enter your 4-digit OTP number"
                    className="no-spinners border border-black rounded text-xs md:text-sm font-medium leading-none py-3 w-full pl-3 mt-2"
                    value={OTP}
                    onChange={(e)=>setOTP(e.target.value)}
                  />
               
                  <div className="mt-8 my-7">
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
              </div>
            }



        {newPasswordPage &&
              <div className="bg-white p-2 rounded-lg w-96">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-2xl text-center font-bold font-sans leading-6 text-gray-800"
                >
                  New password
                </p>

          
                <div className="py-10">
                <div>
                  <label
                    id="number"
                    className="text-lg font-sans font-medium leading-none text-gray-800"
                  >
                    New Password
                  </label>
                  <input
                    aria-labelledby="number"
                    type="password"
                    placeholder="Enter Your new password"
                    className=" border border-black rounded text-xs md:text-sm font-medium leading-none py-3 w-full pl-3 mt-2"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className='mt-5'>
                <label
                    id="number"
                    className="text-lg font-sans font-medium leading-none text-gray-800 mt-8"
                  >
                    Confirm Password
                  </label>
                  <input
                    aria-labelledby="number"
                    type="password"
                    placeholder="Enter your new password"
                    className=" border border-black rounded text-xs md:text-sm font-medium leading-none py-3 w-full pl-3 mt-2"
                    value={CPassword}
                    onChange={(e)=>setCPassword(e.target.value)}
                  />
                </div>

               
                  <div className="mt-8 my-7">
                    <button
                      className="focus:ring-2 dark:bg-gray-800 focus:ring-offset-2 text-lg font-semibold leading-none text-white  focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                      onClick={handleChangePassword}
                   >
                     Submit
                    </button>
                  </div>
                </div>
              </div>
            }




            </div>
          </div>
        </div>
      </div>
    </>
  )
}
