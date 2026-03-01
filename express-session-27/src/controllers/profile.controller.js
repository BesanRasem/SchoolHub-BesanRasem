function getProfile(req,res){
    res.json({
        ok:true,
        message:"Protected route",
        user:req.user,
    })
}
module.exports={getProfile};