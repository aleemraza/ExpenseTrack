const mongoose = require('mongoose');

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
module.exports = mongoose.model('User',userSchema)