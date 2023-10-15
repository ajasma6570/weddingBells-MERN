import express from "express";
import userController from "../Controllers/userController.js";
import AuthenticateToken from "../middleware/authMiddleware.js";

const user_router = express.Router();

user_router.use(express.json());
user_router.use(express.urlencoded({ extended: false }));

user_router.post("/userSignUp", userController.signUp);
user_router.post("/userLogin", userController.login);
user_router.post("/configOTP", userController.configMobOTP);
user_router.post("/CheckOTP", userController.CheckOTP);
user_router.put("/resetPassword", userController.resetPassword);
user_router.post('/createAccountOTP',userController.createAccountOTP);
user_router.get('/getUser',userController.homeAuth)
user_router.put('/userDetailsUpdate',AuthenticateToken("user"),userController.updateDetails)
user_router.get('/userProfileAuth',AuthenticateToken("user"),userController.RoleAuth)

user_router.get('/venueLists',userController.venueList)
user_router.get('/vehicleLists',userController.vehicleList)
user_router.get('/cateringLists',userController.cateringList)

export default user_router;
