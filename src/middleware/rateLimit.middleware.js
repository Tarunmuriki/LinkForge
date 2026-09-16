import rateLimit from "express-rate-limit";
export const authLimiter=rateLimit({windowMs:15*60*1000,max:30,standardHeaders:true,legacyHeaders:false});
export const createLinkLimiter=rateLimit({windowMs:15*60*1000,max:60,standardHeaders:true,legacyHeaders:false});
export const redirectLimiter=rateLimit({windowMs:60*1000,max:180,standardHeaders:true,legacyHeaders:false});
