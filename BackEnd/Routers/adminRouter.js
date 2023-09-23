import express from "express";
import adminController from "../Controllers/adminController.js";

const admin_router = express.Router();

admin_router.use(express.json());
admin_router.use(express.urlencoded({ extended: false }));

admin_router.post("/login", adminController.login);

export default admin_router;
