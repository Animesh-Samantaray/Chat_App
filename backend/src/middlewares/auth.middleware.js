import express from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
export const protectRoute= async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:'Not authorized'})
        }

        const decoded = await jwt.verify(token , process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message:'Not authorized'})
        }

        const user = await User.findById(decoded.userId).select('-password');

        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        req.user = user;
        next();
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}