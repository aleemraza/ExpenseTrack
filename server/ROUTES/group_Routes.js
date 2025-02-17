const express = require('express')
const groupController = require('../CONTROLER/groupController')
const user_Controler = require('../CONTROLER/user_Controler')
const routes = express.Router()


routes.use(user_Controler.Protected)
routes.route('/create_group').post(groupController.Create_Group)
routes.route('/:groupId/invite').post(groupController.group_invite)



module.exports = routes;