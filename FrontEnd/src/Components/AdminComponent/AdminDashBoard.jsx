import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutAdmin } from "../../Redux/Admin/adminSlice";

export default function AdminDashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Login = useSelector((state) => state.rootReducer.admin);

  const handleLogout = () => {
    dispatch(LogoutAdmin());
    navigate("/admin/login");
  };

  return (
    <div>
      <div className="bg-slate-800 flex justify-between">
        <div>
          <span className="text-right  mx-5 text-xl text-white  font-kaushan cursor-pointer">
            Wedding Bells
          </span>
        </div>
        {Login.name && (
          <div>
            <span className="text-right mx-5 text-xl text-white  font-sans cursor-pointer">
              welcome,{Login.name}
            </span>
            <span
              onClick={handleLogout}
              className="text-right mx-5 text-xl text-white  font-sans cursor-pointer"
            >
              Logout
            </span>
          </div>
        )}
      </div>
      <h1 className="text-5xl py-10 text-center">Admin Dashboard</h1>
    </div>
  );
}
