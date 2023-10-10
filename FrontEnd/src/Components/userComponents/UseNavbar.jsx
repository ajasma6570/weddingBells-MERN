import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/user/userSlice";

function UseNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const Login = useSelector((state) => state.rootReducer.user);
  const bgColorClass =
    location.pathname === "/" ? "bg-transparent" : "bg-white";

  const textColorClass =
    location.pathname === "/" ? "text-white" : "text-black";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/user/login");
  };

  return (
    <nav className={`w-full  p-2 ${bgColorClass}`} style={{ height: "4rem" }}>
      <div className="container mx-auto flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className={`${textColorClass} font-bold font-kaushan text-3xl cursor-pointer`}
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
        <div className="hidden lg:flex space-x-10">
          <Link
            className={`${textColorClass} font-sans text-xl hover:text-gray-300`}
            to='/aboutus'
          >
            About us
          </Link>
          <Link
            className={`${textColorClass} font-sans text-xl hover:text-gray-300`}
            to='/contactus'
          >
            Contact us
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
                <div className="absolute mt-2 right-0 w-40 bg-gray-500 border border-gray-300 rounded-lg shadow-lg">
                  <Link to='/user/userProfile' className="w-full py-2 px-4 block font-sans text-white hover:bg-gray-100 hover:rounded hover:text-stone-950  cursor-pointer text-left text-xl focus:outline-none">
                    User Profile
                  </Link>
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
              to="/user/login"
              className={`${textColorClass} font-sans text-xl hover:text-gray-300`}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className={`lg:hidden ${isMobileMenuOpen ? "" : "hidden"}`}>
      {Login.name && (
                <Link
                  to='/user/userProfile'
                  className={`block  ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
                >
                  Welcome {Login.name}
                </Link>

            )}

        <Link
          className={`block ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
          to='/aboutus'
        >
          About us
        </Link>
        <Link
          className={`block ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
          to='/contactus'
        >
          Contact us
        </Link>
        {Login.name && (
                <Link
                  className={`block ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
            )}


          {!Login.name && (
            <Link
              to="/user/login"
              className={`block ${textColorClass} font-sans hover:text-gray-300 py-2 px-4`}
            >
              Login
            </Link>
          )}
      </div>
    </nav>
  );
}

export default UseNavbar;
