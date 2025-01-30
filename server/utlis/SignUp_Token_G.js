const jwt_token = require('jsonwebtoken');

exports.SignUp_token = (id)=>{
    return jwt_token.sign({id:id}, process.env.JWT_TOkEN_KEY, {
        expiresIn:process.env.JWT_EXPRIES_IN
    })
} 