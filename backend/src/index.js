import express from "express";
import authRoutes from './routes/auth.rotute.js' ; 
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv';
import connectDb from "./lib/db.js";
import cookieParser from 'cookie-parser' ; 

dotenv.config();

const app = express();
app.use(express.json()) ; 
const PORT = process.env.PORT;
connectDb();
app.get('/',(req,res)=>{
    res.send('root file')
})
app.use(cookieParser())
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.listen(PORT , ()=>{
    console.log('app listening on port :'+PORT);
})