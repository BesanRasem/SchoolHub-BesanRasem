function logger(req,_res,next){
    const time=new Data().toISOString();
    console.log(`[${time}] ${req.method}${req.originalUrl}`);
    next();
}
module.export=logger;