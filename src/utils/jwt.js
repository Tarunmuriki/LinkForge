import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";
export const signAccess=(user)=>jwt.sign({sub:user._id.toString(),role:user.role},env.JWT_ACCESS_SECRET,{expiresIn:"15m"});
export const signRefresh=(user,jti)=>jwt.sign({sub:user._id.toString(),jti},env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
export const verifyAccess=(token)=>jwt.verify(token,env.JWT_ACCESS_SECRET);
export const verifyRefresh=(token)=>jwt.verify(token,env.JWT_REFRESH_SECRET);
export const hashToken=(token)=>crypto.createHash("sha256").update(token).digest("hex");
