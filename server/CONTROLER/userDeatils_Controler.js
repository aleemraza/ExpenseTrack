const User = require('../MODEL/userModel_Schema')
const Group = require('../MODEL/groupModel_Schema')
const asyncHandler = require("../utlis/asyncHandler");

exports.AllUser = asyncHandler(async(req,res,next)=>{
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            status: 'fail',
            message: 'Email is required',
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }  
    res.status(200).json({
        status: 'success',
        message: 'Find All User Deatils of User',
        data:{
            user
        }
    }); 
})

exports.AllUsersWithGroupStatus = asyncHandler(async(req,res,next)=>{
    const { groupId, email } = req.body;
    // If neither email nor groupId is provided, return an error
    if (!email && !groupId) {
        return res.status(400).json({
            status: 'fail',
            message: 'Email or Group ID is required',
        });
    }
    if (email) {
        const user_email = await User.findOne({ email });
        if (!user_email) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        if (groupId) {
            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Group not found',
                });
            }
            const groupMembers = group.members.map(member => member.userId.toString());
            const userWithStatus = {
                _id: user_email._id,
                name: user_email.name,
                email: user_email.email,
                userStatus: groupMembers.includes(user_email._id.toString())
                    ? 'Already a member of the group'
                    : 'Not a member of the group',
            };
            return res.status(200).json({
                status: 'success',
                message: 'User details with group status',
                data: { userWithStatus },
            });
        }
    }
    if (groupId) {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({
                status: 'fail',
                message: 'Group not found',
            });
        }

        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No users found',
            });
        }
        const groupMembers = group.members.map(member => member.userId.toString());
        const usersWithStatus = users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            userStatus: groupMembers.includes(user._id.toString())
                ? 'Already a member of the group'
                : 'Not a member of the group',
        }));
        return res.status(200).json({
            status: 'success',
            message: 'All users with group membership status',
            data: { usersWithStatus },
        });
    }
});