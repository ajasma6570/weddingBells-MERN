import express from "express";
import adminController from "../Controllers/adminController.js";
import AuthenticateToken from "../middleware/authMiddleware.js";

const admin_router = express.Router();

admin_router.use(express.json()); 
admin_router.use(express.urlencoded({ extended: false }));

admin_router.post("/login", adminController.login);
admin_router.get('/adminUser',AuthenticateToken("admin"),adminController.userList) 
admin_router.get('/adminBusiness',AuthenticateToken("admin"),adminController.BusinessList)
admin_router.post('/userBlock',AuthenticateToken("admin"),adminController.userBlock)
admin_router.post('/userDelete',AuthenticateToken("admin"),adminController.deleteUser)
admin_router.post('/userDetails',AuthenticateToken("admin"),adminController.userDetail)
admin_router.post('/userDetailsEdit',AuthenticateToken("admin"),adminController.userDetailEdit)

admin_router.post('/businessBlock',AuthenticateToken("admin"),adminController.businessAccountBlock)
admin_router.post('/businessDelete',AuthenticateToken("admin"),adminController.deleteBusinessAccount)
admin_router.post('/businessDetails',AuthenticateToken("admin"),adminController.businessDetail)
admin_router.post('/businessAccDetailsEdit',AuthenticateToken("admin"),adminController.businessDetailEdit)

admin_router.get('/venueRequestList',adminController.venueRequestList)
admin_router.get('/vehicleRequestList',adminController.vehicleRequestList)
admin_router.get('/cateringRequestList',adminController.cateringRequestList)

admin_router.post('/venueRequestHandle',adminController.venueRequestHandle)
admin_router.post('/vehicleRequestHandle',adminController.vehicleRequestHandle)
admin_router.post('/cateringRequestHandle',adminController.cateringRequestHandle)

admin_router.get('/getActiveVenue',adminController.getActiveVenue)
admin_router.get('/getActiveVehicle',adminController.getActiveVehicle)
admin_router.get('/getActiveCatering',adminController.getActiveCatering)

export default admin_router;
