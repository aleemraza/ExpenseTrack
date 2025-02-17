const Group = require('../MODEL/groupModel_Schema')
const asyncHandler = require('../utlis/asyncHandler')
const jwt_token = require('jsonwebtoken')
const {send_User_Invite_Email} = require('../mailtrap/emails')

exports.Create_Group = asyncHandler(async(req,res,next)=>{
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Please provide a group name' });
    }
    userId = req.user.id;
    if (!userId) {
        return res.status(400).json({ message: 'User Id and Email Not Found' });
    }
    const newGroup = new Group({
        name,
        createdBy: userId,
        members: [
            {
                userId,
                email: req.user.email,
                role: 'creator',
                status: 'active',
            },
        ],
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
    console.log(email)
    const {groupId} = req.params;
    const userId = req.user.id;
    if(!email){
        return res.status(400).json({ message: 'Email is required' });
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