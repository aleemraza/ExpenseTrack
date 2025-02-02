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
        lowercase: true,
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






module.exports = mongoose.model('User',userSchema)