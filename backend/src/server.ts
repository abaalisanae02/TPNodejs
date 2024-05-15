import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import cors from "cors";
import { image_samples, users_samples } from "./data";
import jwt from "jsonwebtoken";
import imageRouter from './routers/image.router';
import userRouter from "./routers/user.router";
import { dbConnect } from './configs/database.config';
import uploadRouter from './routers/upload.router';
dbConnect();
const app=express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/show",imageRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/users", userRouter)

const port=5000;
app.listen(port, () =>{
    console.log("Website served on http://localhost:"+ port);

});
