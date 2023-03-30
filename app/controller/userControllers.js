const sendToken = require("../../utils/jwtTokens");
const userModel=require("../model/userModels");
const sendEmail=require("../../utils/sendEmail")
const cloudinary=require("cloudinary")


exports.userRegister=async(req,res)=>{
    try{
        const{name,email,password,avatar}=req.body;
        const user= await userModel.create({
        name,
        email,
        password,
        avatar,
    })
   sendToken(user,201,res)
}catch(err){
    res.status(404).json({
        success:false,
        message:err.message
    })
}
}

exports.userLogin=async(req,res,next)=>{
    try{
       
        const{email,password}=req.body
        if(!email || !password){
            return res.status(401).send({message:"email & password"});
        }
        const user=await userModel.findOne({email:email}).select("+password");
        if(!user){
            return res.status(4004).send({message:"user not found"});
        }
        
        const isPasswordMatched=await user.comparePassword(password);
       
        if(!isPasswordMatched){
            return res.status(404).send({message:"user email password not found"});
        }
        
       
        sendToken(user,200,res)
    }catch(err){

        if(err.code===11000){
            res.status(404).json({
                success:false,
                message:"email duplicate err"
                
            }) 
        }
        res.status(404).json({
            success:false,
            message:err.message
            
        })
    }
}

exports.userLogout=async(req,res,next)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            sucess:true,
            message:"logged out",
        });
        
    }catch(err){
        res.status(401).json({
            sucess:false,
            message:err.message,
        });
    }
}

// forgot password

exports.forgotPassword=async(req,res,next)=>{
    

        const user=await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(403).send({message:"user not found in forget password"});
        }

        const restToken=user.getResetPasswordToken();
        await user.save({validateBeforeSave:false});

        const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/password/reset/${restToken}`
         
        const message=`Your password reset token is :- /n/n ${resetPasswordUrl} /n/n If you  have not  requested 
        ignore id`;

try{
    await sendEmail({
        email:user.email,
        subject:`Ecoom password recovery`,
        message,
    })

    res.status(200).json({
        sucess:true,
        message:`email send to ${user.email} successfully`
    });

    }catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return res.status(500).send({message:err.message});
    }
}

exports.getUserDetails=async(req,res,next)=>{
    try{
    const user=await userModel.findById(req.user.id);
    res.status(200).json({
        sucess:true,
        user
        
    })
    }catch(err){
        return res.status(500).send({message:err.message});

    }

}

//update password
exports.updatePassword=async(req,res,next)=>{
    try{
    const user=await userModel.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
       
    if(!isPasswordMatched){
        return res.status(4004).send({message:"old password is incorrect"});
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return res.status(4004).send({message:"password does not matched"});
    }
    user.password=req.body.newPassword;

    await user.save();

    sendToken(user,200,res)
    }catch(err){
        return res.status(500).send({message:err.message});

    }
}

//update name email
exports.updateProfile=async(req,res,next)=>{
    try{
        const newUserData={
            name:req.body.name,
            email:req.body.email,
        };

        const user= await userModel.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });

        res.status(200).json({
            sucess:true
        })
    }catch(err){
        return res.status(500).send({message:err.message});

    }
}


//get all user(admin)
exports.getAllUsers=async(req,res,next)=>{
    await userModel.find({})
    .then((data)=>{
        return res.send(data)
    
    })
    .catch(err=>{
        return res.status(404).send({
            sucess:false,
            message:err.message
        })
    })
}

// get single user(admin)
exports.getSingleUsers=async(req,res,next)=>{
    await userModel.findById(req.params.id)
    .then((data)=>{
        return res.send(data)
    
    })
    .catch(err=>{
        return res.status(404).send({
            sucess:false,
            message:err.message
        })
    })
}


//update user role (Admin)
exports.updateUserRole=async(req,res,next)=>{
    try{
        const newUserData={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        };

        const user= await userModel.findByIdAndUpdate(req.params.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });

        res.status(200).json({
            sucess:true
        })
    }catch(err){
        return res.status(500).send({message:err.message});

    }
}

exports.deleteProfile=async(req,res,next)=>{
    try{
    

        const user=await userModel.findByIdAndRemove(req.params.id);
        if(!user){
            return res.send(403).send({
                message:"user not found"
            })
        }

        res.status(200).json({
            sucess:true
        })
    }catch(err){
        return res.status(500).send({message:err.message});

    }
}