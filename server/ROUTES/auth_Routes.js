const express = require('express')
const auth_Controler = require('../CONTROLER/auth_Controler')
const routes = express.Router();


routes.route('/signup').post(auth_Controler.SignUp);
routes.route('/verify-otp').post(auth_Controler.verifyOTP);
routes.route('/login').post(auth_Controler.Login);



routes.use(auth_Controler.Protected);
routes.route('/updatePassword').patch(auth_Controler.updatePassword)
routes.route('/logout').get(auth_Controler.logout)
routes.route('/loginuser').get(auth_Controler.Login_User)






module.exports = routes