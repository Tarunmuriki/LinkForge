import Link from "../models/Link.js";import ClickEvent from "../models/ClickEvent.js";import {detectDevice} from "../utils/deviceDetector.js";import {hashIp} from "../utils/hashIp.js";
export async function redirect(req,res,next){try{
 const link=await Link.findOne({shortCode:req.params.shortCode,isActive:true});
 if(!link)return res.status(404).json({success:false,error:{code:"NOT_FOUND",message:"Short link not found"}});
 Link.updateOne({_id:link._id},{$inc:{totalClicks:1}}).catch(console.error);
 ClickEvent.create({linkId:link._id,referrer:req.get("referer")||"Direct",deviceType:detectDevice(req.get("user-agent")||""),ipHash:hashIp(req.ip),userAgent:req.get("user-agent")||""}).catch(console.error);
 res.redirect(302,link.destinationUrl);
 }catch(e){next(e)}}
