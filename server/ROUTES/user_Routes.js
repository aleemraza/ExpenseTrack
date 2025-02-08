const express = require('express')
const user_Controler = require('../CONTROLER/user_Controler')
const routes = express.Router();


routes.route('/signup').post(user_Controler.SignUp);
routes.route('/verify-otp').post(user_Controler.verifyOTP);
routes.route('/login').post(user_Controler.Login);



routes.use(user_Controler.Protected);
routes.route('/updatePassword').patch(user_Controler.updatePassword)
routes.route('/logout').get(user_Controler.logout)
routes.route('/loginuser').get(user_Controler.Login_User)






module.exports = routes