import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: 'All fields required' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User with this email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      token,
    });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: error.message });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).json({ message: 'All fields required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'User not found, please register' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: error.message });
  }
};

// ---------------- LOGOUT ----------------
export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- UPDATE PROFILE ----------------
// src/controllers/auth.controller.js
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id.toString(); // <-- convert to string

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile pic required' });
    }

    console.log('Uploading image for user:', userId);

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: 'profile_pics',
      resource_type: 'auto',
    });

    console.log('Cloudinary URL:', uploadResponse.secure_url);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found or not updated' });
    }

    console.log('User updated in DB:', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in update profile:', error);
    res.status(500).json({ message: error.message });
  }
};



// ---------------- CHECK AUTH ----------------
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
