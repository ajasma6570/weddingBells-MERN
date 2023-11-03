import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js';
import cookie from 'cookie'


export const AuthenticateToken = (role) => async (req, res, next) => {
  
  const cookies = cookie.parse(req.headers.cookie || ''); 
  
  const userDetailsCookie = cookies.userDetails;


  if (!userDetailsCookie) { 
    return res.json({ status: 401, message: 'Unauthorized' });
  }

  let jwtToken;
  try {
    // Attempt to parse the JSON string
    const userDetails = JSON.parse(userDetailsCookie);
    jwtToken = userDetails.token;
  } catch (error) {
    return res.json({ status: 401, message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const userRole = decoded.role;

    if (userRole === role) { 
      req.user = await User.findOne({ email: userId }).select('-password');
      req.role = role
      // console.log(req.user);
      const isBlock = req.user.isBlocked
      const isDelete = req.user.isDelete
      if(!isBlock && !isDelete){
        next();
      }else{
        return res.json({ status: 401, message: 'Account Blocked' });
      }
      
    } else {
      return res.json({ status: 401, message: 'Unauthorized' });
    }
  } catch (error) {
    return res.json({ status: 401, message: 'Unauthorized' });
  }
};


export default AuthenticateToken;  