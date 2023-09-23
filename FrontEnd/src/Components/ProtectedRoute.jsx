import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toastWarning } from "./toast";

// const User = localStorage.getItem('userLogin')
// const userIsLogin = User ? true : false;

// const Business = Cookies.get('businessLogin')
// const businessIsLogin = Business ? true : false;

// const Admin = Cookies.get("adminLogin")
// const adminIsLogin = Admin ? true : false;

export const ProtectedRoute = ({ children }) => {
  // Get the serialized state from local storage
  const userJSON = localStorage.getItem("persist:root");

  if (userJSON) {
    // Parse the serialized state into a JavaScript object
    const userState = JSON.parse(userJSON);

    // Check if the 'user' property exists and if it has a 'name' property
    if (userState.user) {
      const user = JSON.parse(userState.user);
      const userName = user.name ? true : false;
      console.log(userName);

      if (userName) {
        toastWarning("Access denied");
        return <Navigate to="/" />;
      }
    }
  }

  return children;
};

export const BrowserProtected = ({ children }) => {
  // Get the serialized state from local storage
  const userJSON = localStorage.getItem("persist:root");

  if (userJSON) {
    // Parse the serialized state into a JavaScript object
    const userState = JSON.parse(userJSON);

    // Check if the 'user' property exists and if it has a 'name' property
    if (userState.business) {
      const user = JSON.parse(userState.business);
      console.log(user);
      const userName = user.name ? true : false;
      console.log(userName);

      if (!userName) {
        return <Navigate to="/business/login" />;
      }
    }
  }

  return children;
};
