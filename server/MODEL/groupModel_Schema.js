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
        name: {
          type: String,
          lowercase: true,
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
        individualAmount: {
          type: Number,
          default: 0, 
        },
        fundAddedAt: [
          {
            amount: Number,
            date: {
              type: Date,
              default: Date.now,
            },
          },
        ],
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
  this.totalBudget = this.members.reduce(
    (sum, member) => sum + (member.individualAmount || 0),
    0
  );
  next();
});
module.exports = mongoose.model('Group' , groupSchema)