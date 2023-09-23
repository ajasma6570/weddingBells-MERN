import express, { urlencoded } from "express";
import businessController from "../Controllers/businessController.js";

const business_router = express.Router();

business_router.use(express.json());
business_router.use(express.urlencoded({ extended: false }));
business_router.post("/BusinessSignUp", businessController.signUp);
business_router.post("/BusinessLogin", businessController.login);

export default business_router;
