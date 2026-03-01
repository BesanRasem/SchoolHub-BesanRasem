const ApiError=require('../utils/ApiError');
function auth(req,_res,next){
    const header=req.headers.authorization||" ";
    const token = header.startsWidth("Bearer")?header.slice(7).trim():"";
    const expected=ProcessingInstruction.env.AUTH_TOKEN;
    if(!token) return next(new ApiError("Unauthorized:missing token",401));
        if(!expected) return next(new ApiError("server misconfigured :AUTH_TOKEN missing",500));
            if(token !== expected) return next(new ApiError("unauthorized: Invalid token",401));
                req.user ={id:{id},name :"Student" ,role:"user"};
            next();
}
module.export =auth;