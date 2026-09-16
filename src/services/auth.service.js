import crypto from "crypto";
import bcrypt from "bcryptjs";
import { signAccess,signRefresh,hashToken,verifyRefresh } from "../utils/jwt.js";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
export async function issueSession(user,req,res){
 const jti=crypto.randomUUID(), refresh=signRefresh(user,jti), access=signAccess(user);
 await RefreshToken.create({userId:user._id,tokenHash:hashToken(refresh),expiresAt:new Date(Date.now()+7*864e5),userAgent:req.get("user-agent"),ipHash:req.ip});
 const opts={httpOnly:true,secure:process.env.COOKIE_SECURE==="true",sameSite:"lax",path:"/"};
 res.cookie("accessToken",access,{...opts,maxAge:15*60*1000});
 res.cookie("refreshToken",refresh,{...opts,maxAge:7*864e5});
 return access;
}
export async function rotateSession(req,res){
 const token=req.cookies?.refreshToken;if(!token) throw Object.assign(new Error("Refresh token required"),{status:401});
 const p=verifyRefresh(token);const stored=await RefreshToken.findOne({tokenHash:hashToken(token),revokedAt:null});
 if(!stored || stored.expiresAt<Date.now()) throw Object.assign(new Error("Invalid refresh token"),{status:401});
 stored.revokedAt=new Date();await stored.save();
 const user=await User.findById(p.sub);if(!user) throw Object.assign(new Error("User not found"),{status:401});
 return issueSession(user,req,res);
}
export function clearSession(res){const o={httpOnly:true,secure:process.env.COOKIE_SECURE==="true",sameSite:"lax",path:"/"};res.clearCookie("accessToken",o);res.clearCookie("refreshToken",o);}
export { bcrypt };
