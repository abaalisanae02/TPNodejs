import {Request, Response, Router } from "express";

import asyncHandler from "express-async-handler";
import { ImageModel } from "../models/image.model";
import multer from  "multer";
import path from "path";
const router=Router();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle image upload
router.post("/", upload.single("image"), asyncHandler(async (req: Request, res: Response) :Promise<any>=> {
    try {
      // Check if file is included in the request
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      // Extract name from the request body
      const {photoname}  = req.body;
      const { buffer, mimetype } = req.file;

      // Create a new image document
      const newImage = new ImageModel({
        name: photoname,
        data:buffer.toString('base64'),
        contentType: mimetype
      });
  
      // Save the image to the database
      await newImage.save();
  
      res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }));
export default router;