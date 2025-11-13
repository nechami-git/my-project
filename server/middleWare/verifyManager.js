const verifyManager = (req,res,next)=>{
if(req.user?.roles!="manager")
    return res.status(401).send("user is Unauthorized!")

    next()
}

module.exports = verifyManager