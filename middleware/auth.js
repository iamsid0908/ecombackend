const jwt=require("jsonwebtoken")
const userModel=require("../app/model/userModels");

exports.isAuthenticated= async(req,res,next)=>{
    
        const {token}= req.cookies;
        if(!token){
            return res.status(404).send({message:"token not found"});
        }
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
       req.user= await  userModel.findById(decodedData.id) ;
        
        next()

   
    
}

exports.authorizedRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(res.status(403).send({message:`role: ${req.user.role} are not allowed`}));
        }
        
    
    next();
    };
}