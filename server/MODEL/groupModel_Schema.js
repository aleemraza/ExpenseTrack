const mongoose = require('mongoose')


const groupSchema = new mongoose.Schema({
  Groupname: {
      type: String,
      required: [true, 'Please provide a group name'],
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: function () {
            return this.status === 'active';
          }
        },
        email: {
          type: String,
          required: true,
          lowercase: true,
        },
        role: {
          type: String,
          enum: ['creator', 'member'],
          default: 'member',
        },
        status: {
          type: String,
          enum: ['invited', 'active'],
          default: 'invited',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
  ],
  totalBudget: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
}
);
groupSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
module.exports = mongoose.model('Group' , groupSchema)