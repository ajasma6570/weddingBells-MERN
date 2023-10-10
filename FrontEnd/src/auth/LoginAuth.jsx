import { useEffect } from "react";
import { Navigate ,Outlet, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import SideBar from "../Pages/userPage/SideBar";
import HomePage from "../Pages/userPage/HomePage";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/user/userSlice";
import { useGetLoginUserMutation } from "../Redux/user/userApiSlice";
import { loginBusinessAccount } from "../Redux/Business/businessSlice";
import { LoginAdmin } from "../Redux/Admin/adminSlice";
import { toastError } from "../Components/toast";
import AdminDashBoardPage from "../Pages/adminPages/AdminDashBoardPage";




export const BusinessLoginAuth = () => {
    const BusinessLogin = Cookies.get("userDetails")
    const isLogin = BusinessLogin? JSON.parse(BusinessLogin) : false
    if(isLogin.role === "business"){
        return <Navigate to='/business/dashboard' />
    }else if(isLogin.role === "admin"){
      toastError("Access denied!!")
      return <HomeAuth/>
    }else if(isLogin.role === "user"){
      toastError("Access denied!!")
      return <HomeAuth/>
    }
    else{
        return <Outlet /> 
    }
  };

export const UserLoginAuth = () => {

    const userLogin = Cookies.get("userDetails")
    const isLogin = userLogin? JSON.parse(userLogin) : false
    
    if(isLogin.role === "user"){
        return <Navigate to='/' />
    }else if(isLogin.role === "admin"){
      toastError("Access denied!!")
      return <HomeAuth/>
    }else if(isLogin.role === "business"){
      toastError("Access denied!!")
      return <HomeAuth/>
    }
    else{
        return <Outlet />
    }
}

export const AdminLoginAuth = () => {
  const adminLogin = Cookies.get("userDetails")
  const isLogin = adminLogin? JSON.parse(adminLogin) : false

  if(isLogin.role === "admin"){
    return <Navigate to='/admin/dash' />
  }else if(isLogin.role === "user"){
    toastError("Access denied!!")
      return <HomeAuth/>
  }else if(isLogin.role === "business"){
    toastError("Access denied!!")
      return <HomeAuth/>
  }else{
    return <Outlet />
  }
} 

export const UserProfileAuth = () => {

    const userLogin = Cookies.get("userDetails")
    const isLogin = userLogin? JSON.parse(userLogin) : false
  
    if(isLogin.role === "user"){
        return <SideBar />
        
    }else{
        return <Navigate to='/user/login' />
    }
}

export const AdminDashAuth = () =>{
  const userLogin = Cookies.get("userDetails")
  const isLogin = userLogin? JSON.parse(userLogin) : false

  if(isLogin.role === "admin"){
    return <AdminDashBoardPage />
  }else{
    return <Navigate to="/admin/login" />
  }

}


export const HomeAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getLoginUser] = useGetLoginUserMutation();
  useEffect(() => {
  
    const fetchData = async () => {
      const userLogin = Cookies.get("userDetails");
      const isLogin = userLogin ? JSON.parse(userLogin) : false;
      if (isLogin.role === "user") {
        const res = await getLoginUser();
        if (res.data && res.data.status === 200) {
          dispatch(loginUser(res.data.userdetails));
          return <HomePage/>
        }
      } else if (isLogin.role === "business") {
        const res = await getLoginUser();
        if (res.data && res.data.status === 200) {
          dispatch(loginBusinessAccount(res.data.userdetails));
          navigate("/business/dashboard");
        }
      } else if (isLogin.role === "admin") {
        const res = await getLoginUser();
        if (res.data && res.data.status === 200) {
          dispatch(LoginAdmin(res.data.userdetails));
          navigate("/admin/dash");
        }
      } else {
        return <HomePage />
      }
    };

    fetchData();
  }, [dispatch, getLoginUser, navigate]);

  return <HomePage />;
};

  
