const express = require('express')
const expenseController = require('../CONTROLER/expenseController')
const user_Controler = require('../CONTROLER/user_Controler')


const routes = express.Router()


routes.use(user_Controler.Protected)
routes.route('/create_expense/:groupId').post(expenseController.CreateExpense)

module.exports = routes;