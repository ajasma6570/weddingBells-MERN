import express from "express";
import userController from "../Controllers/userController.js";

const user_router = express.Router();

user_router.use(express.json());
user_router.use(express.urlencoded({ extended: false }));

user_router.post("/userSignUp", userController.signUp);
user_router.post("/userLogin", userController.login);
user_router.post("/configOTP", userController.configMobOTP);
user_router.post("/CheckOTP", userController.CheckOTP);
user_router.post("/resetPassword", userController.resetPassword);
user_router.post('/createAccountOTP',userController.createAccountOTP);

export default user_router;
