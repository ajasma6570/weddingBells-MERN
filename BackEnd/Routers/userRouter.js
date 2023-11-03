import express from "express";
import userController from "../Controllers/userController.js";
import AuthenticateToken from "../middleware/authMiddleware.js";
import cartController from "../Controllers/cartController.js";
import paymentController from "../Controllers/paymentController.js";
import orderCOntroller from "../Controllers/orderController.js";

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

user_router.post('/venueDetails',userController.venueDetail)
user_router.post('/vehicleDetails', userController.vehicleDetail)
user_router.post('/cateringDetails',userController.cateringDetail)

user_router.post('/venueAddtoCart',cartController.venueCart)
user_router.post('/vehicleAddtoCart',cartController.vehicleCart)
user_router.post('/cateringAddtoCart',cartController.cateringCart)

user_router.post('/getCartDetails',cartController.getCartDetails)
user_router.post('/cartRemoveItem',cartController.removeCartItem)

user_router.post('/UserPaymentOrders',paymentController.orders)
user_router.post('/UserPaymentVerify',paymentController.verify)
 
export default user_router;
