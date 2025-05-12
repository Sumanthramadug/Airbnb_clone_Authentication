var express=require('express');
var router=express.Router();
var userModel=require('../Models/userSchema');
var transporter = require('../Config/nodemailer');
router.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        if(!name || !email || !password){
            return res.json({success:false,message:"Please Fill all the required details"});
        }
        const User=await userModel.findOne({email});
        if(User){
            return res.json({success:false,message:"User Already Exist"});
        }
        const user=new userModel({
            name,email,password
        });

        await user.save();

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'WELCOME TO AIRBNB CLONE',
            text:`Have a Great Day Mr.${user.name} Welcome to our Platform Airbnb`
        }

        await transporter.sendMail(mailOptions);

        return res.json({success:true,message:"User Registered Successful"});

    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.json({success:false,message:"Please Fill all the details"});
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user Doesn't Exist"});
        }
        if(user.password !== password){
            return res.json({success:false,message:"Incorrect Password"});
        }

        return res.json({success:true,message:"User Loggedin Successful"});
    }
    catch(error){
        return res.json({success:true,message:error.message});
    }
});

router.post("/forgotPassword",async(req,res)=>{
    const {email}=req.body;
    try{
        if(!email){
            return res.json({success:false,message:"Please fill all the Required Details"});
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User is Not Registered"});
        }

        const otp=String(Math.floor(100000*Math.random()+900000));
        user.resetOtp=otp;
        const otpExpireInMinutes=10
        const otpExpireAt=Date.now() + otpExpireInMinutes*60*1000;
        user.resetOtpExpireAt=otpExpireAt;

        await user.save();

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:"Reset Your Password OTP Verification Code",
            html: `
        <div style="background-color: #f7f7f7; padding: 40px 0; font-family: 'Arial', sans-serif;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
                <div style="text-align: center;">
                    <img src="https://cdn.worldvectorlogo.com/logos/airbnb-2.svg" alt="Airbnb" style="width: 100px; margin-bottom: 20px;" />
                    <h2 style="color: #ff5a5f;">Reset Your Password</h2>
                </div>
                <p>Hi <strong>${user.name}</strong>,</p>
                <p>We received a request to reset your password. Please use the OTP below to verify your identity:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <div style="display: inline-block; padding: 14px 28px; font-size: 22px; background-color: #ff5a5f; color: #ffffff; border-radius: 8px; font-weight: bold;">
                        ${otp}
                    </div>
                    <p style="margin-top: 15px;">This OTP is valid for <strong>${otpExpireInMinutes} minutes</strong>.</p>
                </div>
                <p>If you did not request this password reset, please ignore this email or <a href="mailto:support@airbnb.com">contact our support team</a> immediately.</p>
                <p>Thank you,<br>The Airbnb Support Team</p>
                <hr style="margin: 30px 0;" />
                <div style="font-size: 12px; color: #888888; text-align: center;">
                    © ${new Date().getFullYear()} Airbnb, Inc. All rights reserved.<br/>
                    <a href="https://www.airbnb.com/help" style="color: #888888; text-decoration: none;">Help Center</a> |
                    <a href="https://www.airbnb.com/terms" style="color: #888888; text-decoration: none;">Terms</a> |
                    <a href="https://www.airbnb.com/privacy" style="color: #888888; text-decoration: none;">Privacy</a>
                </div>
            </div>
        </div>
    `
        }

        await transporter.sendMail(mailOptions);


        return res.json({success:true,message:"An OTP has been sent to your registered email address. Please check your inbox."})
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
});

router.post("/verifyotp",async(req,res)=>{
    const {email,otp}=req.body;
    try{
        if(!email || !otp){
            return res.json({success:false,message:"Please fill all the details"});
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        if(user.resetOtp !== otp){
            return res.json({success:false,message:"Invalid Otp"});
        }
        return res.json({success:true,message:"Please Change Your Password"});

    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
});
router.post("/newPassword",async(req,res)=>{
    const {email,password} = req.body;
    try{
        if(!password){
            return res.json({success:false,message:"Please fill all the details"});
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not Found With that Email Address"});
        }
        user.password=password;
        await user.save();

        return res.json({success:true,message:"Password Changed Successfully"});
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
})


module.exports=router;
