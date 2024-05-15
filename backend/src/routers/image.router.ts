import {Request, Response, Router } from "express";
import { image_samples } from "../data";
import asyncHandler from "express-async-handler";
import { ImageModel } from "../models/image.model";
import multer from  "multer";
const router=Router();

router.get("/seed",asyncHandler(
    async (req,res)=>{
        const imagesCount=await ImageModel.countDocuments();
        if(imagesCount>0){
            res.send("Seed is already done!");
            return;
        }

        await ImageModel.create(image_samples);
        res.send("Seed Is Done!");
        
    }
) );


router.get("/", asyncHandler(async (req,res) =>{
    try {
        const images = await ImageModel.find();
        res.json(images);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching images' });
      }
}))

router.get("/find/:searchTerm",asyncHandler(
    async (req,res)=>{
        const searchRegex=new RegExp(req.params.searchTerm, 'i');
        const images= await ImageModel.find({name:{$regex:searchRegex}})
        const searchTerm = req.params.searchTerm;
        res.send(images);
    })
)



export default router;