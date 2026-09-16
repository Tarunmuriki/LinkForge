import mongoose from "mongoose";
const schema=new mongoose.Schema({
 userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",unique:true,required:true},
 username:{type:String,unique:true,required:true,index:true},
 displayName:{type:String,default:""},
 bio:{type:String,default:""},
 avatarUrl:String,
 theme:{type:String,enum:["minimal-light","dark-slate","gradient"],default:"minimal-light"},
socialLinks:[{title:String,url:String,icon:String,position:Number,isVisible:{type:Boolean,default:true}}],
 isPublished:{type:Boolean,default:true}
},{timestamps:true});
export default mongoose.model("BioPage",schema);
