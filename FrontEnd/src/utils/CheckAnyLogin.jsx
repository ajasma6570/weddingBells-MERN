import Cookies from "js-cookie";
import { toastError } from "../Components/toast";

export const CheckAnylogin = () => {
  const userLoginCookie = Cookies.get("userLogin");
  const isLogin = userLoginCookie ? JSON.parse(userLoginCookie) : false;

  const BusinessLoginCookie = Cookies.get("businessLogin");
  const isBusinessLogin = BusinessLoginCookie
    ? JSON.parse(BusinessLoginCookie)
    : false;

  if (isLogin.login) {
    return true;
  } else {
    return false;
  }
};
