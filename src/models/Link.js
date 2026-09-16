import mongoose from "mongoose";
const schema=new mongoose.Schema({
 userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
 destinationUrl:{type:String,required:true},
 shortCode:{type:String,required:true,unique:true,index:true},
 customSlug:{type:String,unique:true,sparse:true,index:true},
 title:{type:String,default:"Untitled link",maxlength:120},
 totalClicks:{type:Number,default:0},
 isActive:{type:Boolean,default:true}
},{timestamps:true});
schema.index({userId:1,createdAt:-1});
export default mongoose.model("Link",schema);
