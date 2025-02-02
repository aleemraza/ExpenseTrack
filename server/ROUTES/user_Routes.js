const express = require('express')
const user_Controler = require('../CONTROLER/user_Controler')
const routes = express.Router();


routes.route('/signup').post(user_Controler.SignUp);
routes.route('/login').post(user_Controler.Login);





module.exports = routes