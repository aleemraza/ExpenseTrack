const User = require('../MODEL/userModel_Schema')
const jwt_token = require('jsonwebtoken')
const crypto = require('crypto')
const {SignUp_token} = require('../utlis/SignUp_Token_G')
const asyncHandler = require('../utlis/asyncHandler')



exports.SignUp = asyncHandler(async(req,res)=>{
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
});