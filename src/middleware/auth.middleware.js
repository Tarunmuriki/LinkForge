import { verifyAccess } from "../utils/jwt.js";
import User from "../models/User.js";
export async function requireAuth(req,res,next){
 try{
  const token=req.cookies?.accessToken;
  if(!token) return res.status(401).json({success:false,error:{code:"UNAUTHORIZED",message:"Authentication required"}});
  const payload=verifyAccess(token);
  req.user=await User.findById(payload.sub).select("-passwordHash");
  if(!req.user) return res.status(401).json({success:false,error:{code:"UNAUTHORIZED",message:"User not found"}});
  next();
 }catch{ return res.status(401).json({success:false,error:{code:"UNAUTHORIZED",message:"Invalid or expired access token"}}); }
}
