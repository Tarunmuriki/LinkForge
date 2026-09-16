import mongoose from "mongoose";
const schema=new mongoose.Schema({
 userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
 tokenHash:{type:String,required:true,index:true},expiresAt:{type:Date,required:true,index:true},
 revokedAt:Date,userAgent:String,ipHash:String
},{timestamps:true});
export default mongoose.model("RefreshToken",schema);
