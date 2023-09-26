import dotenv from "dotenv";
dotenv.config();

import mongoDBConnect from "./Config/mongoConnect.js";
mongoDBConnect();

import express from "express";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";
import BusinessRouter from "./Routers/BusinessRouter.js";
import admin_router from "./Routers/adminRouter.js";

const app = express();
app.use(cors());

app.use("/user", userRouter);
app.use("/business", BusinessRouter);
app.use("/admin", admin_router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Sever Started ${PORT}`);
});
