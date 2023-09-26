import express from "express";
import businessController from "../Controllers/businessController.js";

const business_router = express.Router();

business_router.use(express.json());
business_router.use(express.urlencoded({ extended: false }));
business_router.post("/BusinessSignUp", businessController.signUp);
business_router.post("/BusinessLogin", businessController.login);
business_router.post('/BusinessconfigOTP',businessController.configOTP);
business_router.post("/BusinessCheckOTP", businessController.CheckOTP);
business_router.post("/BusinessresetPassword", businessController.resetPassword);
business_router.post('/BusinessCreateAccountOTP',businessController.createAccountOTP);

export default business_router;
