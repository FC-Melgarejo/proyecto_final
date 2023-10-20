const { Router } = require('express');
const UserManagerController = require('../controllers/messagesControllers');

const userManagerRouter = new Router();
const userManagerController = new UserManagerController();

userManagerRouter.post('/create', userManagerController.createUser.bind(userManagerController));
userManagerRouter.post('/authenticate', userManagerController.authenticateUser.bind(userManagerController));
userManagerRouter.get('/admin/:email', userManagerController.checkAdminStatus.bind(userManagerController));

module.exports = userManagerRouter;

