const nodeMailer=require("nodemailer")
require('dotenv').config()

const sendEmail=async(option)=>{
    console.log("hi")
    let transportar = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    });

    const mailOption={
        from:process.env.SMPT_MAIL,
        to:option.email,
        subject:option.subject,
        text:option.message,
    };
    await transportar.sendMail(mailOption);

}
module.exports=sendEmail;