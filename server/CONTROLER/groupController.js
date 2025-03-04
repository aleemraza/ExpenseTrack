const Group = require('../MODEL/groupModel_Schema')
const User = require('../MODEL/userModel_Schema')
const asyncHandler = require('../utlis/asyncHandler')
const jwt_token = require('jsonwebtoken')
const {send_User_Invite_Email} = require('../mailtrap/emails')

exports.Create_Group = asyncHandler(async(req,res,next)=>{
    const {Groupname,totalBudget} = req.body;
    if (!Groupname) {
        return res.status(400).json({ message: 'Please provide a group name' });
    }
    user_Id = req.user.id;
    if (!user_Id) {
        return res.status(400).json({ message: 'User Id and Email Not Found' });
    }
    const newGroup = new Group({
        Groupname,
        createdBy: user_Id,
        members: [
            {
                userId:user_Id,
                email: req.user.email,
                role: 'creator',
                status: 'active',
            },
        ],
        totalBudget:totalBudget
    });
   await newGroup.save();
    res.status(200).json({
        status: 'success',
        message: 'Create a Group Dear',
        data:{
            newGroup
        }
    }); 
})

exports.group_invite = asyncHandler(async(req,res,next)=>{
    const {email} = req.body;
    const {groupId} = req.params;
    const userId = req.user.id;
    if(!email){
        return res.status(400).json({ message: 'Email is required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User is already registered' });
    }
    const group = await Group.findById(groupId)
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }
    if (group.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Only the group creator can invite members' });
    }
    const group_name = group.name
    const inviteToken = jwt_token.sign({ email, groupId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const signupLink = `${process.env.FRONTEND_URL}/signup?token=${inviteToken}`;
    send_User_Invite_Email(email,signupLink,group_name)
    group.members.push({
        email,
        role: 'member',
        status: 'invited',
        inviteToken
    });
    await group.save();
    res.status(200).json({
        status: 'success',
        message: `Invitation sent to ${email}`,
    });
})

exports.View_Group = asyncHandler(async(req,res,next)=>{
    const user =  req.user._id 
    if(!user){
        return res.status(400).json({ message: 'User Not login' });
    }
    const groups = await Group.find({createdBy: user});
    if (!groups) {
        return res.status(404).json({ status: 'fail', message: 'No groups found' });
    }
   const groupData = groups.map(group=>({
    groupId: group._id,
    groupName : group.Groupname,
    grouptotalBudget : group.totalBudget,
    memberrole : group.members.map(member => (member.role)),
    totalMembers: group.members ? group.members.length : 0 
   }));
    res.status(200).json({
        status: 'success',
        message: 'Create a Group Dear',
        data:{
            groupData
        }
    }); 
})

exports.Find_Group_Id = asyncHandler(async(req,res,next)=>{
    const {groupId} = req.body;
    if(!groupId){
        return res.status(404).json({ status: 'fail', message: 'Group ID Not found' });
    }
    const group_data = await Group.findById({_id:groupId})
    if(!group_data){
        return res.status(404).json({ status: 'fail', message: 'Group  Not found' });
    }
    res.status(200).json({
        status: 'success',
        message: 'Create a Group Dear',
        data:{
            group_data
        }
    }); 
});





