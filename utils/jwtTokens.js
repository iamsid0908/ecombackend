require('dotenv').config()
const cookieParser = require("cookie-parser");

const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();
    console.log(token)
    const option={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true
    };
    res.cookie('token',token,option).json({
        success:true,
        token,
        user
    })


    // res.cookie('token', token, {
    //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expiration (7 days in this example)
    //     httpOnly: true, // The cookie is only accessible through HTTP requests, not JavaScript
    //     secure: true, // The cookie is only sent over HTTPS
    //   })

    //   res.send({
    //     success:true,
    //         token,
    //         user
    //   })
}

module.exports=sendToken;