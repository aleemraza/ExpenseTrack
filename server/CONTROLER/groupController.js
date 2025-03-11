const Group = require('../MODEL/groupModel_Schema')
const User = require('../MODEL/userModel_Schema')
const asyncHandler = require('../utlis/asyncHandler')
const jwt_token = require('jsonwebtoken')
const {send_User_Invite_Email,send_PAYMENT_ADDED_EMAIL} = require('../mailtrap/emails')


//Create Expensis  Group 
exports.Create_Group = asyncHandler(async(req,res,next)=>{
    const {Groupname} = req.body;
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
                name:req.user.name,
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

//Invite User By email To add Groups 
exports.group_invite = asyncHandler(async(req,res,next)=>{
    const {email,groupId} = req.body;
    console.log(email,groupId)
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

//Show All Group to all User
exports.View_Group = asyncHandler(async(req,res,next)=>{
    const user =  req.user._id 
    if(!user){
        return res.status(400).json({ message: 'User Not login' });
    }
    const groups = await Group.find({
        $or:[
            {createdBy: user},
            {"members.email": req.user.email}
       ]
    });
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

// Find Group By ID 
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

//Add Fund OF Memeber 
exports.addFundToMember = asyncHandler(async(req,res,next)=>{
    const { groupId, userId, amount} = req.body;
    if(!groupId || !userId || amount === undefined){
        return res.status(400).json({
            status: 'fail',
            message: 'Group ID, User ID, and Amount are required',
        });
    }
    const group = await  Group.findById(groupId)
    if(!group){
        return res.status(404).json({
            status: 'fail',
            message: 'Group not found',
        });
    }

    const member = group.members.find(mm => mm.userId.toString() === userId)
    if(!member){
        return res.status(404).json({
            status: 'fail',
            message: 'Member not found in the group',
        });
    }
    member.individualAmount += amount;
    member.fundAddedAt.push({
        amount: amount,
        date: new Date(),
    })
    group.totalBudget = group.members.reduce(
        (sum, member) => sum + (member.individualAmount || 0),
        0
    );
    await group.save();
    send_PAYMENT_ADDED_EMAIL(member.email, member.name, group.Groupname, amount, member.individualAmount, group.totalBudget);
    saveAmountData = {
        userId: member.userId,
        name : member.name,
        email: member.email,
        updatedAmount: member.individualAmount,
        fundHistory: member.fundAddedAt,
        totalBudget: group.totalBudget,
    }
    res.status(200).json({
        status: 'success',
        message: 'Add Fund of Memeber',
        data :{
            saveAmountData
        }
    }); 
})


//Add Memeber In the Group
exports.addMemberToGroup = asyncHandler(async (req, res, next) => {
    const { groupId,userId } = req.body;
    const user = await User.findById(userId)
    if(!user){
        return res.status(400).json({ message: 'User Not Found' });
    }
    const  {name,email} = user
    if (!groupId || !userId || !name || !email) {
        return res.status(400).json({ message: 'Group ID, User ID, name, and email are required' });
    }
    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }
    const isAlreadyMember = group.members.some(member => member.userId.toString() === userId);
    if (isAlreadyMember) {
        return res.status(400).json({ message: 'User is already a member of this group' });
    }
    group.members.push({
        userId,
        name,
        email,
        role: 'member',
        status: 'active',
    });
    await group.save();
    res.status(200).json({
        status: 'success',
        message: 'Member added successfully',
        data:{
            groupId,
            userId,
            name,
            email,
            status: 'active',
        },
    });
});



