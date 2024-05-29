import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
// @ts-ignore
import userRouter from './routes/users';
import path from 'path';

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

app.use("/api/users",userRouter)
app.use("/api/auth",authRoutes)

app.listen(7000,()=>{
    console.log("server is currently running !");
});