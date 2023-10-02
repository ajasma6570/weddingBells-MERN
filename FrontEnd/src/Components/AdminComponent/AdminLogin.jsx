import React, { useState } from "react";
import { useAdminLoginMutation } from "../../Redux/Admin/adminApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../toast";
import { validateEmail, validatePasswordLength } from "../../utils/validation";
import { LoginAdmin } from "../../Redux/Admin/adminSlice";
import { CookiesDataSave, checkUserLoginned } from "../../auth/CookiesManagement";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [AdminLogin] = useAdminLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
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

    if(!checkUserLoginned()){
      toastError("Please log out of any other logged-in accounts before logging in again.")
      return;
    }

    const res = await AdminLogin({ email, password });

    if (res.data.status === 200) {
      
      const userId = res.data.adminDetails.id
      const token = res.data.adminDetails.token

     await CookiesDataSave("admin",userId, token)
      toastSuccess(res.data.message);
      dispatch(LoginAdmin(res.data.adminDetails));
      navigate("/admin/dash",  { replace: true });
      // window.location.reload();
    } else {
      toastError(res.data.message);
      navigate("/admin/login");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center py-10 items-center ">
        <div className="bg-white border border-black rounded-lg p-5 shadow-md md:w-96">
          <p className="text-2xl text-center font-bold text-gray-800">
            Welcome Admin
          </p>
          <div className="py-4">
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your valid E-mail address"
              className="border border-black rounded px-3 py-2 w-full mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <label
              htmlFor="password"
              className="text-lg font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="border border-black rounded px-3 py-2 w-full mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <p className="text-blue-700 text-right mt-2">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p> */}
          <div className="mt-6">
            <button
              // style={{ backgroundColor: "rgba(205, 165, 34, 0.77)" }}
              className="text-sm font-semibold text-white py-3 w-full bg-slate-600"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
