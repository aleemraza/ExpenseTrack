const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email'],
        // lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords do not match',
        },
    },
    role: {
        type: String,
        enum: ['superuser', 'user'],
        default: 'user',
    },
    avatar: {
        type: String,
        default: 'default-avatar-url.jpg',
    },
    avatarPublicId: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: {
        type: Date
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, required: false },
    otpExpires: { type: Date, required: false },
    createdGroups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
    ],
    invitedGroups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
    ],
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return  next()
    this.passwordChangedAt = Date.now() - 1000;
    next();
})
// 4 Create Funcation to compared the userpassord and dbpassowrd 
userSchema.methods.correctPassword = async function(canidatePassword,userPassword){
    return await bcrypt.compare(canidatePassword, userPassword);
}

// 
userSchema.methods.ChangePassowrdAfter = function(jwt_Time_Stamp_Change_password_token){
    if(this.passwordChangedAt){
        console.log('jwt_Time_Stamp_Change_password_token',jwt_Time_Stamp_Change_password_token)
        const JWTTimeStampInMs  = jwt_Time_Stamp_Change_password_token * 1000 ;
        console.log("JWTTimeStampInMs",JWTTimeStampInMs)
        return JWTTimeStampInMs < this.passwordChangeAt.getTime();
    }
    return false
}






module.exports = mongoose.model('User',userSchema)