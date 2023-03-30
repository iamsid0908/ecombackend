const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require('dotenv').config()
const crypto=require("crypto");

const userScema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter yr name"],
        maxLength:[30,"cannot exid"],
        minLength:[4,"more than 5 char"]
    },
    email:{
        type:String,
        require:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter your email"]
    },
    password:{
        type:String,
        require:[true,"please enter yr password"],
        minLength:[8,"password should be more than 8 char"],
        select:false
    },
    avatar:{
        type:String,
        default:"hi"
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userScema.pre("save" ,async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

//jwt token
userScema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//comparePassword

userScema.methods.comparePassword=async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

userScema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}
module.exports=mongoose.model("User",userScema);