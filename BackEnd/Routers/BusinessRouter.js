import express from "express";
import businessController from "../Controllers/businessController.js";
import multer from "multer"
import {businessUpload} from "../utils/multerConfig.js"
import AuthenticateToken from "../middleware/authMiddleware.js";

const business_router = express.Router();

business_router.use(express.json());
business_router.use(express.urlencoded({ extended: false }));

business_router.post("/BusinessSignUp", businessController.signUp);
business_router.post("/BusinessLogin", businessController.login);
business_router.post('/BusinessconfigOTP',businessController.configOTP);
business_router.post("/BusinessCheckOTP", businessController.CheckOTP);
business_router.post("/BusinessresetPassword", businessController.resetPassword);
business_router.post('/BusinessCreateAccountOTP',businessController.createAccountOTP);
business_router.post('/BusinessAccountUpdate',AuthenticateToken("business"),businessController.BusinessUpdateDetails)
business_router.post('/BusinessVenueAdd',AuthenticateToken("business"),businessUpload.array("images"),businessController.BusinessVenueAdd)
business_router.post('/BusinessVehicleAdd', AuthenticateToken("business"),businessUpload.array("images"),businessController.BusinessVehicleAdd)
business_router.post('/BuisnessCateringAdd',AuthenticateToken("business"),businessUpload.array("images"),businessController.BusinessCateringAdd)
business_router.get('/BusinessProfileAuth',AuthenticateToken("business"),businessController.RoleAuth)
export default business_router;
