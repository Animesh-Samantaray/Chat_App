import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from '../lib/cloudinary.js'
export const getUsersForSidebar = async(req,res)=>{
    try{
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedUserId}}).select('-password');

        res.status(200).json(filteredUsers);
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }

};

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;
    
        const messages=await Message.find({
            $or:[
                {senderId:myId , recieverId:userToChatId},
                {senderId:userToChatId , recieverId:myId}
                ]
        });
        res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
 
export const sendMessage = async(req,res)=>{
    try{
        const {text,image} = req.body;
        const senderId = req.user._id;
        const {id:receiverId} = req.params;
       let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,receiverId,text,image:imageUrl
        })

        await newMessage.save();

        // todo -> using socket.io

        res.status(201).json(newMessage);
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}