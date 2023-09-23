import HomePage from "./Pages/userPage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./Pages/userPage/Loginpage";
import SignUpPage from "./Pages/userPage/SignUpPage";
import { ToastContainer } from "react-toastify";
import BusinessLoginPage from "./Pages/businessPage/BusinessLoginPage";
import SignupPageBusiness from "./Pages/businessPage/SignupPageBusiness";
import BusinessDashBoardPage from "./Pages/businessPage/BusinessDashBoardPage";
import AdminLoginPage from "./Pages/adminPages/AdminLoginPage";
import AdminDashBoardPage from "./Pages/adminPages/AdminDashBoardPage";
import ForgetPasswordPage from "./Pages/userPage/ForgetPasswordPage";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
  
  {/* User routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />

  {/* Business routes */}
          <Route path="/business/login" element={<BusinessLoginPage />} />
          <Route path="/business/signup" element={<SignupPageBusiness />} />
          <Route path="/business/dashboard" element={<BusinessDashBoardPage />}/>

  {/* admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashBoardPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
