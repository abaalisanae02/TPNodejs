import { Router } from "express";
import { users_samples } from "../data";
import jwt  from "jsonwebtoken";
const router=Router();
import asyncHandler from 'express-async-handler';
import { UserModel } from "../models/user.model";
router.get("/seed",asyncHandler(
    async (req,res)=>{
        const usersCount=await UserModel.countDocuments();
        if(usersCount>0){
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(users_samples);
        res.send("Seed Is Done!");
            
    }
) );

router.post("/login",(req,res)=>{
    const {username,password}=req.body;
    const user =users_samples.find(user=> user['username']==username && user['password']== password);
    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Username or Password is not valid!")
    }
})

const generateTokenResponse=(user:any)=>{
    const token=jwt.sign({
        username: user['username']
    },"SomeRandomText",{
        expiresIn:"30d"
    });

    user.token=token;
    return user;
}
export default router;