import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./Pages/userPage/Loginpage";
import SignUpPage from "./Pages/userPage/SignUpPage";
import { ToastContainer } from "react-toastify";
import BusinessLoginPage from "./Pages/businessPage/BusinessLoginPage";
import SignupPageBusiness from "./Pages/businessPage/SignupPageBusiness";
import AdminLoginPage from "./Pages/adminPages/AdminLoginPage";
import ForgetPasswordPage from "./Pages/userPage/ForgetPasswordPage";
import {BusinessLoginAuth , HomeAuth, UserLoginAuth, AdminLoginAuth, AdminDashAuth} from './auth/LoginAuth'
import "./index.css";
import BusinessForgetPasswordPage from "./Pages/businessPage/BusinessForgetPasswordPage";
import AboutUsPage from "./Pages/userPage/AboutUsPage";
import ContactUsPage from "./Pages/userPage/ContactUsPage";
import AccountDetails from "./Pages/userPage/AccountDetails";
import Orders from "./Components/userComponents/Orders";
import AccountUpdate from "./Pages/userPage/AccountUpdate";
import UserProfilePasswordChange from "./Components/userComponents/UserProfilePasswordChange";
import AdminDash from './Components/AdminComponent/AdminDash'
import AdminUser from './Components/AdminComponent/AdminUser'
import AdminBusiness from './Components/AdminComponent/AdminBusiness'
import AdminService from './Components/AdminComponent/AdminService'
import AdminBooking from './Components/AdminComponent/AdmminBooking'
import AdminUserEdit from "./Components/AdminComponent/AdminUserEdit";
import AdminBusinessEdit from "./Components/AdminComponent/AdminBusinessEdit";
import BusinessAccountDetails from "./Components/businessComponent/BusinessAccountDetails";
import BusinessAccountUpdate from "./Components/businessComponent/BusinessAccountUpdate";
import BusinessAccPasswordChange from "./Components/businessComponent/BusinessAccPasswordChange";
import BusinessServiceAdd from "./Components/businessComponent/BusinessServiceAdd";
import UserRoleAuth from "./auth/UserRoleAuth";
import BusinessRoleAuth from "./auth/BusinessRoleAuth";
import BusinessRequests from "./Components/businessComponent/BusinessRequests";
import AdminRequestManagement from "./Components/AdminComponent/AdminRequestManagement";
import BusinessServiceList from "./Components/businessComponent/BusinessServiceList";
import VenueListPage from "./Pages/userPage/VenueListPage"
import VehicleListPage from "./Pages/userPage/VehicleListPage"
import CateringListPage from "./Pages/userPage/CateringListPage"
import VenueDetailPage from "./Pages/userPage/VenueDetailPage";
import VehicleDetailPage from "./Pages/userPage/VehicleDetailPage";
import CateringDetailPage from "./Pages/userPage/CateringDetailPage";
import UserCartPage from "./Pages/userPage/UserCartPage";
import UserBookingCompletedPage from "./Pages/userPage/UserBookingCompletedPage";
import CancelOrders from "./Components/userComponents/CancelOrders";



function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
  
  {/*public Route */}
          <Route path="/" element={<HomeAuth />} />
          <Route path='/aboutus' element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUsPage />}/>
          <Route  path="/venueList" element={<VenueListPage/>}/>
          <Route  path="/vehicleList" element={<VehicleListPage/>}/>
          <Route  path="/cateringList" element={<CateringListPage/>}/>
          <Route path="/venueList/venueDetail/:venueId" element={<VenueDetailPage/>}/>
          <Route path="/vehicleList/vehicleDetail/:vehicleId" element={<VehicleDetailPage/>}/>
          <Route path="/cateringList/cateringDetail/:cateringId" element={<CateringDetailPage/>}/>
         <Route path="/test" element={<UserBookingCompletedPage/>}/>


    {/* user Private Route */}
    
          <Route path="/user" element={<UserLoginAuth />}>
              <Route path="login" element={<Loginpage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="forgetpassword" element={<ForgetPasswordPage />} />
          </Route>

          <Route path="/user/userProfile" element={<UserRoleAuth />}>
                  <Route index element={<AccountDetails />} />
                <Route path="accountdetails"  element={<AccountDetails/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="cancelOrders" element={<CancelOrders/>}/>
                <Route path="accountUpdate/:userId" element={<AccountUpdate />}/>
                <Route path="passwordChange/:UserPhone" element={<UserProfilePasswordChange/>} />
          </Route>

            <Route path="/userCart" element={<UserCartPage/>}/>
            <Route path="/userBookingCompleted/:bookingId" element={<UserBookingCompletedPage/>}/>


  {/* Business private routes */}
          <Route path="/business" element={<BusinessLoginAuth />}>
              <Route path="login" element={<BusinessLoginPage />} />
              <Route path="signup" element={<SignupPageBusiness/>} />
              <Route path="forgetpassword"  element={<BusinessForgetPasswordPage />}/>
          </Route>
          
        
         
  {/* business Protected Route */}
          <Route path="/business/dashboard" element={<BusinessRoleAuth />}>
              <Route index element={<BusinessAccountDetails />} />
            <Route path="businessAccountDetails" element={<BusinessAccountDetails/>}/>
            <Route path="businessAccontUpdate/:userId" element={<BusinessAccountUpdate/>}/>
            <Route path="businessAccPasswordChange/:UserPhone" element={<BusinessAccPasswordChange/>}/> 
            <Route path="businessAddService/:userId" element={<BusinessServiceAdd/>}/>
            <Route path="businessRequests/:userId" element={<BusinessRequests/>}/>
            <Route path="businessServiceList/:userId" element={<BusinessServiceList/>}/>
          </Route>

 
  {/* admin routes */}
          <Route path="/admin" element={<AdminLoginAuth />}>
          <Route path="login" element={<AdminLoginPage />} />
          </Route>
            
          <Route path="/admin/dash" element={<AdminDashAuth/>}>
          <Route index element={<AdminDash/>} />
          <Route path="dashboard" element={<AdminDash/>} />
          <Route path="user" element={<AdminUser/>}/>
          <Route path="business" element={<AdminBusiness/>}/>
          <Route path="booking/*" element={<AdminBooking/>}/>
          <Route path="userEdit/:userId" element={<AdminUserEdit/>}/>
          <Route path="businessEdit/:userId" element={<AdminBusinessEdit />} />
          {/* Descendant Routes */} 
          <Route path="requestManagement/*" element={<AdminRequestManagement/>}/>
          <Route path="service/*" element={<AdminService/>}/>

          </Route>
         



        </Routes>
      </Router>
    </>
  );
}

export default App;
