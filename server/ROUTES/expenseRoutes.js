const express = require('express')
const expenseController = require('../CONTROLER/expenseController')
const auth_Controler = require('../CONTROLER/auth_Controler')


const routes = express.Router()

routes.use(auth_Controler.Protected)
routes.route('/create_expense/:groupId').post(expenseController.CreateExpense)

module.exports = routes;