import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {generateVerificationCode,generateTokenAndSetCookie} from "../utils/generateVerificationCode.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";
import crypto from 'crypto';
const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExist = await User.findOne({email });
    console.log(userAlreadyExist)
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
  
    const verificationCode=generateVerificationCode();
    const user=new User({
      email,
      password:hashPassword,
      name,
      verificationToken:verificationCode,
      verificationTokenExpiresAt:Date.now()+24*60*60*1000
    })
    await user.save();

     generateTokenAndSetCookie(res,user._id);
     await sendVerificationEmail(user.email,verificationCode);

    res.status(201).json({success:true,message:"User created successfully",user:{
      ...user._doc,
      password:undefined
    }})
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const verifyEmail=async(req,res)=>{
  const {code}=req.body;
  try{
    const user=await User.findOne({
      verificationToken:code,
      verificationTokenExpiresAt:{$gt:Date.now()}
    })

    if(!user){
      return res.status(400).json({success:false,message:"Invalid or expired verification code"});
    }
    user.isVerified=true;
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt=undefined;
    await user.save();

    await sendWelcomeEmail(user.email,user.name);
    res.status(200).json({success:true,message:"Email verified successfully",user:{
      ...user._doc,
      password:undefined
    }})
  }catch(error){
    res.status(500).json({success:false,message:"Server error"});
  }
}





const signIn = async (req, res) => {
  
  const {email,password}=req.body;
  try{
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({success:false,message:"Invalid credentials"})
    }
    const isPasswordValid=await bcryptjs.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(400).json({success:false,message:"Invalid credentials"})
    }
    generateTokenAndSetCookie(res,user._id);
    user.lastLogin=new Date();
    await user.save();

    res.status(200).json({success:true,message:"Logged in successfully",user:{
      ...user._doc,
      password:undefined
    }})
  }catch(error){
      res.status(400).json({success:false,message:error.message});
  }
};


const forgetPassword=async(req,res)=>{
  const {email}=req.body;
  try{
    const user=await User.findOne({email});

    if(!user){
      return res.status(400).json({success:false,message:"User not found"});
    }
    const resetToken=crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt=Date.now()+1*60*60*1000; //1 hour
    user.resetPasswordToken=resetToken,
    user.resetPasswordExpiresAt=resetTokenExpiresAt;

    await user.save();
    await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
    res.status(200).json({success:true,message:"Password reset link sent to your email"})
  }catch(error){
    res.status(400).json({success:false,message:error.message});
  }
}


const resetPassword=async(req,res)=>{
  try{
    const {token}=req.params;
    const {password}=req.body;
    const user=await User.findOne({resetPasswordToken:token,resetPasswordExpiresAt:{$gt:Date.now()}});

    if(!user){
      return res.status(400).json({success:false,message:"Invalid or expired reset token"});
    }
    const hashedPassword=await bcryptjs.hash(password,10);
    user.password=hashedPassword;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpiresAt=undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res.status(200).json({success:true,message:"Password reset successfully"})
  }catch(error){
    console.log(error);
    res.status(400).json({success:false,message:error.message});
  }
}




const logOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({success:true,message:"Logged out successfully"})
};



const checkAuth=async(req,res)=>{
  try{
    const user=await User.findById(req.userId).select("-password")

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({success:true,user});
    
  }catch(error){
      return res
        .status(400)
        .json({ success: false, message:error.message});
  
  }
}


export default {
  signUp,
  signIn,
  logOut,
  verifyEmail,
  forgetPassword,
  resetPassword,
  checkAuth,
};
