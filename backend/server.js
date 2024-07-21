import express from 'express';
import dotenv from'dotenv';
import authRouter from './routes/authroutes.js';
import messageRouter from './routes/messageRoutes.js';
import userRouter from './routes/userRoutes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 7070;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter)

app.listen(PORT, () =>  {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)})