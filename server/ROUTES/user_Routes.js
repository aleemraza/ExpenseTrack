const express = require('express')
const auth_Controler = require('../CONTROLER/auth_Controler')
const userDeatils_Controler = require('../CONTROLER/userDeatils_Controler')

const routes = express.Router()
// routes.use(auth_Controler.Protected)
routes.route('/alluser').get(userDeatils_Controler.AllUser)
routes.route('/AllUsersWithGroupStatus').get(userDeatils_Controler.AllUsersWithGroupStatus)

module.exports = routes