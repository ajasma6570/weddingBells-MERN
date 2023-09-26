import Cookies from 'js-cookie';

// Export the function with a named export
export const CookiesDataSave = (role, userid, token) => {
  Cookies.set(
    'userDetails',
    JSON.stringify({
      role : role,
      userid : userid,
      token : token,
    }),
    {
      expires: 30, // Expires in 30 days
      secure: true, // Set the secure flag
    }
  );
};

// Export the function with a named export
export const checkUserLoginned = () => {
  const userLoginCookie = Cookies.get('userDetails'); // Change 'userLogin' to 'userDetails'
  const isLogin = userLoginCookie ? true : false;
  console.log(isLogin);

  if (isLogin) {
    return false;
  }

  return true;
};
