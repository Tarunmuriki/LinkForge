import mongoose from "mongoose";import {connectDB} from "../config/database.js";import User from "../models/User.js";import Link from "../models/Link.js";import BioPage from "../models/BioPage.js";import ClickEvent from "../models/ClickEvent.js";import {bcrypt} from "../services/auth.service.js";
await connectDB();await Promise.all([User.deleteMany({}),Link.deleteMany({}),BioPage.deleteMany({}),ClickEvent.deleteMany({})]);
const user=await User.create({name:"Tarun Demo",email:"demo@linkforge.dev",username:"tarun",passwordHash:await bcrypt.hash("password123",12),emailVerified:true});
const links=await Link.create([
{userId:user._id,title:"Portfolio",destinationUrl:"https://example.com/portfolio",shortCode:"port01",totalClicks:8420},
{userId:user._id,title:"Summer Sale",destinationUrl:"https://example.com/sale",shortCode:"sale01",customSlug:"summer-sale",totalClicks:12402},
{userId:user._id,title:"GitHub",destinationUrl:"https://github.com",shortCode:"git001",totalClicks:5981}
]);
await BioPage.create({userId:user._id,username:"tarun",displayName:"Tarun",bio:"Designer & Developer",theme:"gradient",socialLinks:[{title:"Portfolio",url:"https://example.com",position:0},{title:"GitHub",url:"https://github.com",position:1},{title:"LinkedIn",url:"https://linkedin.com",position:2}]});
const events=[];for(const link of links)for(let i=0;i<25;i++)events.push({linkId:link._id,timestamp:new Date(Date.now()-Math.random()*30*864e5),deviceType:["Mobile","Desktop","Tablet"][i%3],referrer:["Instagram","Google","Direct","LinkedIn"][i%4],ipHash:`demo-${i}`});await ClickEvent.insertMany(events);
console.log("Seed complete. Demo: demo@linkforge.dev / password123");await mongoose.disconnect();
