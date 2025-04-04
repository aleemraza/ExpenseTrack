const express = require('express')
const groupController = require('../CONTROLER/groupController')
const auth_Controler = require('../CONTROLER/auth_Controler')
const routes = express.Router()


routes.use(auth_Controler.Protected)
routes.route('/create_group').post(groupController.Create_Group)
routes.route('/Add_Fund_of_Member').post(groupController.addFundToMember)
routes.route('/Add_NEW_Member').post(groupController.addMemberToGroup)
routes.route('/Invite_Group_Member').post(groupController.group_invite)
routes.route('/view_all_groups').get(groupController.View_Group)
routes.route('/find_group_id').get(groupController.Find_Group_Id)




module.exports = routes;