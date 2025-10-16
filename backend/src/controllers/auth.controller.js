import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup= async (req,res)=>{
    try {
        const {fullName,email,password} = req.body;
        if(!password || !fullName || !email){
            return res.status(400).json({message:'All fields required'})
        }
        else if(password.length<6){
            return res.status(400).json({message:'Password minimum length must be 6'});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:'User with this email already exists'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            email,
            fullName,
            password:hashedPassword});

        if(newUser){
           const token= generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                ProfilePic:newUser.profilePic,
                token:token
            })
        }

    } catch (error) {
        console.log('error is : '+error);
        return res.status(500).json({message:error.message})
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({message:'All fields required'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).message('You dont have account, Register please');
        }
        const check = await bcrypt.compare(password,user.password);

        if(!check){
            return res.status(401).json({message:'Incorrect password'})
        }
        const token = generateToken(user._id , res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            token:token,
            profilePic:user.profilePic
        })
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
    
}

export const logout=(req,res)=>{
    try {
    res.cookie('jwt','',{maxAge:0});
    res.status(200).json({message:'logged out'});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



export const updateProfile = async(req,res)=>{
    try {
       const {profilePic} = req.body;
       const userId = req.user._id;

       if(!profilePic){
        return res.status(400).json({message:'Profile pic required'});
       }

       const uploadResponse = await cloudinary.uploader.upload(profilePic);

       const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})


       res.status(200).json(updatedUser)
    } catch (error) {
        
    }
}


export const checkAuth= async(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}