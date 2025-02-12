const User = require('../MODEL/userModel_Schema')
const jwt_token = require('jsonwebtoken')
const crypto = require('crypto')
const asyncHandler = require('../utlis/asyncHandler')
const {sendEMail} = require('../utlis/nodeMailer')
const {sendVerificationEmail, sendWelcomeEmail} = require('../mailtrap/emails')
const {generateOTP} = require('../utlis/OTPgenrate')
const util = require('util')
const promisify = util.promisify
const {SignUp_token} = require('../utlis/SignUp_Token_G')




exports.SignUp = asyncHandler(async(req,res,next)=>{
    const {name,email,password,passwordConfirm} = req.body;
    if(!name || !email || !password || !passwordConfirm){
        return res.status(400).json({
            status: "fail",
            message: "All fields are required"
        })
    }
    const userAlreadyExists  = await User.findOne({email})
    if(userAlreadyExists){
        return res.status(400).json({ success: false, message: "User already exists" });
    }
    //Generate OTP
    const otp = generateOTP()
    // OTP valid for 10 minutes
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    // Hash OTP before saving
    const hashedOTP = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    // // Create New User with OTP (User remains unverified) 
    // Send Email to User 
    try{
        await sendVerificationEmail(email,otp)
    }catch(error){
        return res.status(500).json({
            status: "fail",
            message: "Failed to send verification email. Please try again.",
        });
    }
    try{
        const newUser = await User.create({
            name,
            email,
            password,
            passwordConfirm,
            isVerified : false,
            otp: hashedOTP,
            otpExpires: otpExpires,
        });
        // Generate a temporary session token (valid for OTP verification)
        const sessionToken = jwt_token.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        const cookieOptions = {
            expires: new Date(Date.now() + 10 * 60 * 1000),
            httpOnly: true,
            secure: true,  
            sameSite: "None",
        };
        res.cookie('sessionToken', sessionToken, cookieOptions)
        res.status(200).json({
            status: 'success',
            message: 'Your Secure  6-Digit OTP for ExpenseTrack Account Verification  sent On email',
        }); 
    }catch(error){
        return res.status(500).json({
            status: "fail",
            message: "User registration failed. Please try again.",
        });
    }
});

exports.verifyOTP  = asyncHandler(async(req,res,next)=>{
    const { otp } = req.body;
    const sessionToken  = req.cookies.sessionToken;
    if(!sessionToken){
        return res.status(401).json({ 
            status: "fail", 
            message: "OTP has expired. Please request a new one." 
        });
    }
    // Decode token to get userId

    const decoded = jwt_token.verify(sessionToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
        return res.status(400).json({ status: "fail", message: "User not found" });
      }
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");  
  
    // Check if OTP matches and is not expired
    if (user.otp !== hashedOtp || Date() > user.otpExpires) {
        return res.status(400).json({ status: "fail", message: "Invalid or expired OTP" });
    }
    // Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save({ validateBeforeSave: false });

    try{
        await sendWelcomeEmail(user.email, user.name);
    }catch(error){
        return res.status(500).json({
            status: "fail",
            message: "Failed to send Wellcome email. Please try again.",
        });
    }
    //Clear sessionToken 
    res.clearCookie("sessionToken");
    res.status(200).json({
        status: 'success',
        message: "Your email has been successfully verified! Welcome to ExpenseTrack"
    });
}) 

exports.Login = asyncHandler(async(req,res, next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({
            status: "fail",
            message:"Please Provide Email Or password"
        });
        return;
    }
    const current_user = await User.findOne({email}).select('+password')
    if(!current_user || !(await current_user.correctPassword(password, current_user.password))){
        res.status(404).json({
            status:"failed",
            message:"Incorrect Email  or password"
        });
        return;
    }
    if (!current_user.isVerified) {
        return res.status(403).json({
            status: "fail",
            message: "Your email is not verified. Please verify your email before logging in.",
        });
    }
    const token = SignUp_token(current_user._id)
    if(!token){
        return  res.status(400).json({
            status: "fail",
            message: "Token Are Not Recived"
        });
    }
     // New Method For  Token Expire 
     const hours = parseInt(process.env.JWT_EXPRIES_IN, 10);
     const expiresInMilliseconds = hours * 60 * 60 * 1000;
     const expirationDate = new Date(Date.now() + expiresInMilliseconds);
     
     const cookieOptions = {
         expires: expirationDate,
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production', 
         sameSite: 'None'
     };
    res.cookie('jwt', token, cookieOptions)
    current_user.isLoggedIn = true;
    current_user.lastLogin = new Date();
    current_user.password = undefined
    res.status(200).json({
        status: 'success',
        message: 'Create User API HERE',
        token,
        data:{
            current_user
        }
    });
});

exports.Protected = async(req,res,next)=>{
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return res.status(400).json({
            status: "fail",
            message: "Token are not found"
        })
    }
    try{
        const decoded  = await promisify(jwt_token.verify)(token, process.env.JWT_TOkEN_KEY);
        const current_user = await User.findById(decoded.id)
        if(!current_user){
            return res.status(401).json({
                status: 'Failed',
                message: 'The User belonging to this token no longer exists.',
            });
        }
        const jwt_Time_Stamp_Change_password_token = decoded.iat;
        if(current_user.ChangePassowrdAfter(jwt_Time_Stamp_Change_password_token)){
            return res.status(401).json({
                status: 'failed',
                message: 'User recently changed password! Please log in again.',
            });
        }
        req.user = current_user;
        res.locals.user = current_user;
        next();
    }catch(erorr){
        if (erorr.name === 'TokenExpiredError') {
            message = 'Your token has expired! Please log in again to get access.';
        } 
        return res.status(401).json({
            status: 'Failed',
            message:"Invalid token! Please log in again to get access.",
            error: erorr.message
        });   

    }
}
// 
exports.restricted = async(role)=>{
    return (req,res,next)=>{
        if(!req.user){
            res.status(401).json({message:"You are not logged in!"})
        }
        if(req.user.role !== role){
            return res.status(403).json({
                    status:"failed",
                    message: "you do not have permission to perform this action"
                })
        }
    }
} 
exports.Login_User = asyncHandler(async(req,res,next)=>{
    const {name,id} = req.body;
    if(!name || !id){
        return res.status(400).json({
            status: "fail",
            message: "All fields are required"
        })
    }
    
})

// we write updatePassword  
exports.updatePassword  = asyncHandler(async(req,res,next)=>{
    // 1) Get user from collection
    const update_user_passowrd = await  User.findById(req.user.id).select('+password')
    if(!(await update_user_passowrd.correctPassword(req.body.currentpassword, update_user_passowrd.password))){
        return res.status(400).json({
            status: "fail",
            message: "Your current password is incorrect"
        });
    }
    if (req.body.newpassword !== req.body.newconformpassword) {
        return res.status(400).json({
            status: "fail",
            message: "New passwords do not match"
        });
    }
 // 3) If so, update password
    update_user_passowrd.password = req.body.newpassword;
    update_user_passowrd.passwordConfirm = req.body.newconformpassword;
    update_user_passowrd.passwordChangedAt = Date.now();
    update_user_passowrd.isLoggedIn = false;
    await update_user_passowrd.save()
// 3) Clear the current JWT cookie (if using cookies)
    res.cookie('jwt','logout', {
        expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: 'strict'
    });

    const token =  SignUp_token(update_user_passowrd.id)
    const role  = update_user_passowrd.role;
    if(!token){
        return res.status(400).json({
            status: "fail",
            message: "Token not received"
        });
    }
    res.status(200).json({
        status: "success",
        message: "Password updated successfully. Please log in again.",
        token,
        role
    });
})

exports.logout = asyncHandler(async(req,res,next)=>{
    const user = req.user
    if(!user){
        return res.status(404).json({
            status: "failed",
            message: "User not found"
        });
    }
    user.isLoggedIn = false;
    await user.save({validateBeforeSave:false});
    res.cookie('jwt','logout',{
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    return res.status(200).json({
        status: "success",
        message: "Successfully logged out"
    });
})