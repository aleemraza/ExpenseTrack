const express = require('express');
const Expense = require('../MODEL/expenseModel_Schema');
const Group = require('../MODEL/groupModel_Schema');
const asyncHandler = require('../utlis/asyncHandler');


exports.CreateExpense = asyncHandler(async(req,res)=>{
    const { description, amount,excludedMembers} = req.body;
    const { groupId } = req.params;
    if (!groupId) {
        return res.status(400).json({ message: 'Group ID is required' });
    }
    userId = req.user.id;
    if (!userId) {
        return res.status(400).json({ message: 'User Id and Email Not Found' });
    }
    const group = await Group.findById(groupId).populate('members.userId')
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    if(amount > group.totalBudget){
        return res.status(400).json({ error: 'Insufficient balance in total collection' });
    }
    const contributingMembers = group.members.filter(member => !excludedMembers.includes(member.userId._id.toString()));
    const nonContributingMembers = group.members.filter(member => excludedMembers.includes(member.userId._id.toString()));

    const contributingMemberCount = contributingMembers.length;
    if (contributingMemberCount === 0) {
        return res.status(400).json({ error: 'No contributing members to share the expense' });
    }
    const sharePerContributingMember = amount / contributingMemberCount;

    const contributingMemberIds = new Set(contributingMembers.map(member => member.userId._id.toString()));
    const contributors = group.members.map(member => ({
        userId: member.userId ? member.userId._id : null,
        amount: contributingMemberIds.has(member.userId._id.toString()) ? sharePerContributingMember : 0,
    }));
    // Deduct from total collection
    group.totalBudget -= amount;
    await group.save();

    // Create new expense
    const expense = await Expense.create({
        groupId,
        description,
        amount,
        createdBy: userId,
        contributors
    });  
    res.status(200).json({
        status: 'success',
        message: `Expense of ₹${amount} added, each contributing member pays ₹${sharePerContributingMember}.`,
        remainingBalance: group.totalBudget,
        expense,
    }); 
})