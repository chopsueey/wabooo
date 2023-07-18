//1 import cloudinary from 'cloudinary';
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

//2 configure cloudinaryd
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

//3 export cloudinary
export { cloudinary };