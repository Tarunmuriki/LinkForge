export const validate=(schema,source="body")=>(req,res,next)=>{
 const result=schema.safeParse(req[source]);
 if(!result.success) return res.status(422).json({success:false,error:{code:"VALIDATION_ERROR",message:"Invalid request",details:result.error.flatten()}});
 req[source]=result.data; next();
};
