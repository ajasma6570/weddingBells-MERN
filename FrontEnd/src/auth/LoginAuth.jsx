import { Navigate ,Outlet} from "react-router-dom";
import Cookies from "js-cookie";
import SideBar from "../Pages/userPage/SideBar";

export const BusinessLoginAuth = () => {
    const BusinessLogin = Cookies.get("userDetails")
    const isLogin = BusinessLogin? JSON.parse(BusinessLogin) : false
    console.log(isLogin);
    if(isLogin.role === "business"){
        return <Navigate to='/business/dashboard' />
    }else{
        return <Outlet /> 
    }
  };

export const UserLoginAuth = () => {

    const userLogin = Cookies.get("userDetails")
    const isLogin = userLogin? JSON.parse(userLogin) : false
    console.log(isLogin);

    if(isLogin.role === "user"){
        return <Navigate to='/' />
    }else{
        return <Outlet />
    }
}

export const UserProfileAuth = () => {

    const userLogin = Cookies.get("userDetails")
    const isLogin = userLogin? JSON.parse(userLogin) : false
    console.log(isLogin);

    if(isLogin.role === "user"){
        return <SideBar />
        
    }else{
        return <Navigate to='/user/login' />
    }
}
