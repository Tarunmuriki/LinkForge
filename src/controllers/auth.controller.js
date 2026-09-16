import User from "../models/User.js";
import { issueSession,rotateSession,clearSession,bcrypt } from "../services/auth.service.js";
export async function register(req,res,next){try{
 const {name,email,password,username}=req.body;
 if(await User.exists({$or:[{email},{username}]})) return res.status(409).json({success:false,error:{code:"ACCOUNT_EXISTS",message:"Email or username is already in use"}});
 const user=await User.create({name,email,passwordHash:await bcrypt.hash(password,12),username});
 await issueSession(user,req,res);
 res.status(201).json({success:true,data:{user:{id:user._id,name:user.name,email:user.email,username:user.username}}});
 }catch(e){next(e)}}
export async function login(req,res,next){try{
 const user=await User.findOne({email:req.body.email});if(!user || !(await bcrypt.compare(req.body.password,user.passwordHash))) return res.status(401).json({success:false,error:{code:"INVALID_CREDENTIALS",message:"Invalid email or password"}});
 await issueSession(user,req,res);res.json({success:true,data:{user:{id:user._id,name:user.name,email:user.email,username:user.username}}});
 }catch(e){next(e)}}
export async function refresh(req,res,next){try{await rotateSession(req,res);res.json({success:true,message:"Session refreshed"})}catch(e){next(e)}}
export async function logout(req,res){clearSession(res);res.json({success:true,message:"Logged out"})}
export async function me(req,res){res.json({success:true,data:{user:req.user}})}
export async function forgotPassword(req,res){res.json({success:true,message:"If the account exists, a reset flow would be initiated. This assessment starter simulates the flow."})}
export async function resetPassword(req,res){res.json({success:true,message:"Password reset endpoint placeholder; wire token verification before production."})}
