const User = require('../MODEL/userModel_Schema')
const jwt_token = require('jsonwebtoken')
const crypto = require('crypto')
const asyncHandler = require('../utlis/asyncHandler')
const util = require('util')
const promisify = util.promisify
const {SignUp_token} = require('../utlis/SignUp_Token_G')



exports.SignUp = asyncHandler(async(req,res,next)=>{
    const {name,email,password,passwordConfirm,role} = req.body;
    if(!name || !email || !password || !passwordConfirm || !role){
        return res.status(400).json({
            status: "fail",
            message: "All fields are required"
        })
    }
    // Create New User 
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        role
    })
    const newuser_Token = SignUp_token(newUser._id)
    if(!newuser_Token){
        return res.status(400).json({
            status: "fail",
            message: "Token Are Not Recived"
        });
    }
    const hours = parseInt(process.env.JWT_EXPRIES_IN, 10);
    const expiresInMilliseconds = hours * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + expiresInMilliseconds);

    const cookieOptions = {
        expires: expirationDate,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',  
        sameSite: 'strict'
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie('jwt', newuser_Token, cookieOptions)
        newUser.password = undefined
        newUser.passwordConfirm = undefined
    res.status(200).json({
        status: 'success',
        message: 'Create User API HERE',
        data:{
            newUser
        }
    });
    // next()
});

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
     // End of new Method 

    const cookieOptions = {
        expires: expirationDate,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',  
        sameSite: 'strict' // or 'lax', based on your CSRF protection needs
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie('jwt', token, cookieOptions)

    current_user.isLoggedIn = true;
    current_user.lastLogin = new Date();
    try {
        await current_user.save({ validateBeforeSave: false });
    } catch (saveError) {
        console.error("Validation error on save:", saveError);
        return res.status(400).json({
            status: "fail",
            message: "Validation error",
            error: saveError.message
        });
    }
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

exports.Login_User = asyncHandler(async(req,res,next)=>{
    const {name,id} = req.body;
    if(!name || !id){
        return res.status(400).json({
            status: "fail",
            message: "All fields are required"
        })
    }
    
})