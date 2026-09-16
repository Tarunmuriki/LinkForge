import Link from "../models/Link.js";import ClickEvent from "../models/ClickEvent.js";
const range=(req)=>{const to=req.query.to?new Date(req.query.to):new Date();const from=req.query.from?new Date(req.query.from):new Date(Date.now()-30*864e5);return {from,to}};
async function ownedIds(userId){return (await Link.find({userId}).select("_id")).map(x=>x._id)}
export async function overview(req,res,next){try{
 const ids=await ownedIds(req.user._id),{from,to}=range(req);
 const [clicks,links,devices,referrers]=await Promise.all([
  ClickEvent.countDocuments({linkId:{$in:ids},timestamp:{$gte:from,$lte:to}}),
  Link.countDocuments({userId:req.user._id}),
  ClickEvent.aggregate([{$match:{linkId:{$in:ids},timestamp:{$gte:from,$lte:to}}},{$group:{_id:"$deviceType",count:{$sum:1}}},{$sort:{count:-1}}]),
  ClickEvent.aggregate([{$match:{linkId:{$in:ids},timestamp:{$gte:from,$lte:to}}},{$group:{_id:{$ifNull:["$referrer","Direct"]},count:{$sum:1}}},{$sort:{count:-1}},{$limit:10}])
 ]);
 res.json({success:true,data:{clicks,links,devices,referrers}});
 }catch(e){next(e)}}
export async function clicks(req,res,next){try{
 const ids=await ownedIds(req.user._id),{from,to}=range(req);
 const data=await ClickEvent.aggregate([{$match:{linkId:{$in:ids},timestamp:{$gte:from,$lte:to}}},{$group:{_id:{$dateToString:{format:"%Y-%m-%d",date:"$timestamp"}},count:{$sum:1}}},{$sort:{_id:1}}]);
 res.json({success:true,data});
 }catch(e){next(e)}}
export async function devices(req,res,next){try{const ids=await ownedIds(req.user._id);res.json({success:true,data:await ClickEvent.aggregate([{$match:{linkId:{$in:ids}}},{$group:{_id:"$deviceType",count:{$sum:1}}},{$sort:{count:-1}}])})}catch(e){next(e)}}
export async function referrers(req,res,next){try{const ids=await ownedIds(req.user._id);res.json({success:true,data:await ClickEvent.aggregate([{$match:{linkId:{$in:ids}}},{$group:{_id:{$ifNull:["$referrer","Direct"]},count:{$sum:1}}},{$sort:{count:-1}},{$limit:10}])})}catch(e){next(e)}}
export async function linkAnalytics(req,res,next){try{const link=await Link.findOne({_id:req.params.id,userId:req.user._id});if(!link)return res.status(404).json({success:false,error:{code:"NOT_FOUND",message:"Link not found"}});const [clicks,devices,referrers]=await Promise.all([
ClickEvent.aggregate([{$match:{linkId:link._id}},{$group:{_id:{$dateToString:{format:"%Y-%m-%d",date:"$timestamp"}},count:{$sum:1}}},{$sort:{_id:1}}]),
ClickEvent.aggregate([{$match:{linkId:link._id}},{$group:{_id:"$deviceType",count:{$sum:1}}}]),
ClickEvent.aggregate([{$match:{linkId:link._id}},{$group:{_id:{$ifNull:["$referrer","Direct"]},count:{$sum:1}}},{$sort:{count:-1}},{$limit:10}])
]);res.json({success:true,data:{link,clicks,devices,referrers}})}catch(e){next(e)}}
