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
import UserPrivateRoute from "./auth/UserPrivateRoute";
import {BusinessLoginAuth , UserLoginAuth, UserProfileAuth} from './auth/LoginAuth'
import "./index.css";
import BusinessForgetPasswordPage from "./Pages/businessPage/BusinessForgetPasswordPage";
import AboutUsPage from "./Pages/userPage/AboutUsPage";
import ContactUsPage from "./Pages/userPage/ContactUsPage";
import TrailPage from "./Pages/TrailPage";
import AccountDetails from "./Pages/userPage/AccountDetails";
import Orders from "./Pages/userPage/Orders";
import AccountUpdate from "./Pages/userPage/AccountUpdate";
import UserProfilePasswordChange from "./Components/userComponents/UserProfilePasswordChange";


function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
  
  {/*public Route */}
          <Route path="/" element={<HomePage />} />
          <Route path='/aboutus' element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUsPage />}/>
          <Route path="trail" element={<TrailPage />} />

    {/* user Private Route */}
    
          <Route path="/user" element={<UserLoginAuth />}>
              <Route path="login" element={<Loginpage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="forgetpassword" element={<ForgetPasswordPage />} />
          </Route>

          <Route path="/user/userProfile" element={<UserProfileAuth />}>
                  <Route index element={<AccountDetails />} />
                <Route path="accountdetails"  element={<AccountDetails/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="accountUpdate" element={<AccountUpdate />}/>
                <Route path="passwordChange/:UserPhone" element={<UserProfilePasswordChange/>} />
          </Route>
        

  {/* Business private routes */}
          <Route path="/business" element={<BusinessLoginAuth />}>
              <Route path="login" element={<BusinessLoginPage />} />
              <Route path="signup" element={<SignupPageBusiness/>} />
              <Route path="forgetpassword"  element={<BusinessForgetPasswordPage />}/>
          </Route>
          

         
  {/* business Protected Route */}
          {/* <Route path="/business" element={<UserPrivateRoute/>}>  
              <Route path="dashboard" element={<BusinessDashBoardPage />}/>
          </Route> */}
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
