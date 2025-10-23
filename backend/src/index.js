import express from "express";
import authRoutes from './routes/auth.route.js' ; 
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv';
import connectDb from "./lib/db.js";
import cookieParser from 'cookie-parser' ; 
import cors from 'cors';
dotenv.config();
import path from 'path'
import {io , app , server} from '../src/lib/socket.js'
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
 
const PORT = process.env.PORT;
const __dirname=path.resolve();


connectDb();
app.get('/',(req,res)=>{
    res.send('root file')
})
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}


server.listen(PORT , ()=>{
    console.log('app listening on port :'+PORT);
})