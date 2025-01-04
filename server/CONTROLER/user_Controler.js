const asyncHandler = require('../utlis/asyncHandler')



exports.SignUp = asyncHandler(async(req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Create User API HERE',
    });
});