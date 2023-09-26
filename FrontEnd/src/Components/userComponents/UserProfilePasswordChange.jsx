import React, { useEffect, useState } from 'react'
import { toastError, toastSuccess } from '../toast';
import { validatePasswordLength, validatePhone } from '../../utils/validation';
import { useMobileOTPMutation, useResetPasswordMutation, useVerifyOTPMutation } from '../../Redux/user/userApiSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserProfilePasswordChange() {


    const [requestPage, setRequestpage] = useState(true)
    const [verifyPage, setVerifyPage] =useState(false)
    const [newPasswordPage, setnewPasswordPage] = useState(false)
    const [countdown, setCountdown] = useState(30);
    const [phone, setPhone] = useState("");
    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");
  
    const {UserPhone} = useParams()

    const [MobileOTP] = useMobileOTPMutation();
    const [verifyOTP] = useVerifyOTPMutation();
    const [resetPassword] = useResetPasswordMutation();
  
    const navigate = useNavigate();

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


    const handleRequest = async() => {
        if (!phone) {
            toastError("please Enter your 10 digit number");
            return;
          }
      
          if (!validatePhone(phone)) {
            toastError("Enter 10 digit number");
            return;
          }

          if(UserPhone !== phone){
            toastError("Enter your loggined phone number");
            return;
          }
      
          const res = await MobileOTP({ phone });
          if (res.data.status === 200) {
            toastSuccess(res.data.message);
            setRequestpage(false)
            setVerifyPage(true);
          } else {
            toastError(res.data.message);
            return
          }
    }

    const handleResend = async() => {
        const res = await MobileOTP({ phone });
        if (res.data.status === 200) {
          toastSuccess(res.data.message);
          setCountdown(30);
          setVerifyPage(true)
        } else {
          toastError(res.data.message);
          return
    }
}

    const handleVerify = async() => {
    if (!OTP) {
      toastError("Enter 4 digit OTP ");
      setVerifyPage(true)
      return;
    }

    if (OTP.length !== 4) {
      toastError("OTP must be 4 digit");
      setVerifyPage(true)
      return;
    }

    const res = await verifyOTP({ OTP, phone });
    if (res.data.status === 200) {
      toastSuccess(res.data.message);
      setVerifyPage(false);
      setnewPasswordPage(true);
    } else {
      toastError(res.data.message);
      navigate("/user/userProfile");
    }

    }

   const handleSubmit = async() => {
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
        navigate("/user/userProfile");
      } else {
        toastError(res.data.message);
        return;
      }
   }

   

      
  return (
    <div> 
      

      { requestPage && <div >
          <div className="my-5 ">
            <label>Enter Phone Number</label>
            <span className="pl-10 pr-5">:</span>
            <input placeholder='Enter your phone number'  className="border border-black rounded-md px-3" 
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            />
          </div>
          <div className="px-28">
          <button className="border border-black rounded-md px-2 bg-gray-800 hover:bg-gray-500 text-white"
          onClick={handleRequest}
          >Request OTP</button>
          </div>
        </div>}




        { verifyPage && 
        <div >
          <div className="my-5 ">
            <label>Verify OTP</label>
            <span className="pl-10 pr-5">:</span>
            <input placeholder='Enter 4-digit OTP number'  className="border border-black rounded-md px-3" 
            value={OTP}
            onChange={(e)=>setOTP(e.target.value)}
            />
          </div>
          <div className="px-28">
          <button className="border border-black rounded-md px-2 bg-gray-800 hover:bg-gray-500 text-white"
           onClick={countdown === 0 ? handleResend : handleVerify}>
             {countdown === 0
          ? "Resend OTP"
          : `Verify (${countdown}s)`}
            </button>
          </div>
        </div>
        }
    


    { newPasswordPage && <div >
          <div className="my-5 ">
            <label>Enter New Password</label>
            <span className="pl-10 pr-5">:</span>
            <input placeholder='Enter new password'  className="border border-black rounded-md px-3" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="my-5 ">
            <label>Confirm Password</label>
            <span className="pl-10 pr-5">:</span>
            <input placeholder='Enter password'  className="border border-black rounded-md px-3" 
            value={CPassword}
            onChange={(e)=>setCPassword(e.target.value)}
            />
          </div>
          <div className="px-28">
          <button className="border border-black rounded-md px-2 bg-gray-800 hover:bg-gray-500 text-white"
          onClick={handleSubmit}
          >Submit</button>
          </div>
        </div>
        }

    
    </div>
  )
}
