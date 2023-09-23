import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutBusinessAccount } from "../../Redux/Business/businessSlice";
import BusinessLogin from "./BusinessLogin";

function BusinessNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const Login = useSelector((state) => state.business);

  const bgColorClass =
    location.pathname === "/" ? "bg-transparent" : "bg-white";

  const textColorClass =
    location.pathname === "/" ? "text-white" : "text-black";
  console.log(location.pathname);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutBusinessAccount());
    navigate("/business/login");
  };

  return (
    <nav className={`w-full  p-2 ${bgColorClass}`} style={{ height: "4rem" }}>
      <div className="container mx-auto flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className={`${textColorClass} font-bold font-kaushan text-5xl cursor-pointer`}
        >
          Wedding Bells
        </div>

        {/* Mobile menu toggle button */}
        <div className="lg:hidden md:block sm:block">
          <button
            onClick={toggleMobileMenu}
            className={`${textColorClass} hover:text-gray-300 focus:outline-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "black" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex space-x-4">
          <Link
            className={`${textColorClass} font-sans text-2xl hover:text-gray-300`}
          >
            About us
          </Link>
          <Link
            className={`${textColorClass} font-sans text-2xl hover:text-gray-300`}
          >
            Contact Us
          </Link>

          {Login.name && (
            <div className="relative ">
              <span
                className={`cursor-pointer ${textColorClass} font-sans text-2xl hover:text-gray-300`}
                onClick={handleDropdownToggle}
              >
                Welcome {Login.name}
              </span>
              {isDropdownOpen && (
                <div className="absolute mt-2 right-0 w-40 bg-transparent border border-gray-300 rounded-lg shadow-lg">
                  <div className="w-full py-2 px-4 block font-sans text-white hover:bg-gray-100 hover:rounded hover:text-stone-950  cursor-pointer text-left text-xl focus:outline-none">
                    User Profile
                  </div>
                  <hr />
                  <div
                    className="w-full py-2 px-4 block  font-sans text-white hover:bg-gray-100 hover:rounded hover:text-stone-950 cursor-pointer text-left text-xl focus:outline-none"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}

          {!Login.name && (
            <Link
              to="/login"
              className={`${textColorClass} font-sans text-2xl hover:text-gray-300`}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className={`lg:hidden ${isMobileMenuOpen ? "" : "hidden"}`}>
        <Link
          className={`block ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
        >
          About Us
        </Link>
        <Link
          className={`block ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
        >
          Contact Us
        </Link>
        <Link
          to="/login"
          className={`block ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default BusinessNavbar;
