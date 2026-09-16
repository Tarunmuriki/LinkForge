import Link from "../models/Link.js";
import ClickEvent from "../models/ClickEvent.js";
import QRCode from "qrcode";
import { generateShortCode } from "../utils/slugGenerator.js";
export async function createLink(req,res,next){try{
 const {destinationUrl,customSlug,title}=req.body;
 let shortCode=customSlug||generateShortCode();
 if(await Link.exists({$or:[{shortCode},{...(customSlug?{customSlug}:{})}]})) return res.status(409).json({success:false,error:{code:"SLUG_ALREADY_EXISTS",message:"That slug is already taken."}});
 const link=await Link.create({userId:req.user._id,destinationUrl,shortCode,customSlug:customSlug||undefined,title:title||"Untitled link"});
 res.status(201).json({success:true,data:link});
 }catch(e){next(e)}}
export async function listLinks(req,res,next){try{
 const page=Math.max(1,Number(req.query.page)||1),limit=Math.min(50,Number(req.query.limit)||10),q=(req.query.q||"").trim();
 const filter={userId:req.user._id,...(q?{$or:[{title:{$regex:q,$options:"i"}},{destinationUrl:{$regex:q,$options:"i"}},{shortCode:{$regex:q,$options:"i"}}]}:{})};
 const [items,total]=await Promise.all([Link.find(filter).sort({createdAt:-1}).skip((page-1)*limit).limit(limit),Link.countDocuments(filter)]);
 res.json({success:true,data:{items,total,page,limit,pages:Math.ceil(total/limit)}});
 }catch(e){next(e)}}
export async function getLink(req,res,next){try{const link=await Link.findOne({_id:req.params.id,userId:req.user._id});if(!link)return res.status(404).json({success:false,error:{code:"NOT_FOUND",message:"Link not found"}});res.json({success:true,data:link})}catch(e){next(e)}}
export async function updateLink(req,res,next){try{const link=await Link.findOneAndUpdate({_id:req.params.id,userId:req.user._id},req.body,{new:true,runValidators:true});if(!link)return res.status(404).json({success:false,error:{code:"NOT_FOUND",message:"Link not found"}});res.json({success:true,data:link})}catch(e){next(e)}}
export async function deleteLink(req,res,next){try{const link=await Link.findOneAndDelete({_id:req.params.id,userId:req.user._id});if(!link)return res.status(404).json({success:false,error:{code:"NOT_FOUND",message:"Link not found"}});await ClickEvent.deleteMany({linkId:link._id});res.json({success:true,message:"Link deleted"})}catch(e){next(e)}}
export async function qr(req,res,next){try{const link=await Link.findOne({_id:req.params.id,userId:req.user._id});if(!link)return res.status(404).json({success:false,error:{code:"NOT_FOUND",message:"Link not found"}});const url=`${process.env.CLIENT_URL||"http://localhost:5173"}/r/${link.shortCode}`;const data=await QRCode.toDataURL(url,{margin:2,width:320});res.json({success:true,data:{qrCodeDataUrl:data,url}})}catch(e){next(e)}}
