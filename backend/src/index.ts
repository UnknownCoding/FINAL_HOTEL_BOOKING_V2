import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users';
import hotelsRoutes from './routes/hotels';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import { Request,Response } from 'express';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string).then(()=>{
    console.log("Connected to database");
}).catch((error)=>{
    console.log("Error connecting to MongoDB: ",error);
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use("/api/users",userRouter);
app.use("/api/auth",authRoutes);
app.use("/api/hotels",hotelsRoutes)

// catch all routes , some of our routes are in conditional logic so wont be part of our static files !
app.get('*',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"))
})

app.listen(7000,()=>{
    console.log("server is currently running !");
});