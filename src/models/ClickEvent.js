import mongoose from "mongoose";
const schema=new mongoose.Schema({
 linkId:{type:mongoose.Schema.Types.ObjectId,ref:"Link",required:true,index:true},
 timestamp:{type:Date,default:Date.now,index:true},
 referrer:String,
 deviceType:{type:String,enum:["Mobile","Desktop","Tablet","Unknown"],default:"Unknown"},
 ipHash:String,userAgent:String
});
schema.index({linkId:1,timestamp:-1});
export default mongoose.model("ClickEvent",schema);
