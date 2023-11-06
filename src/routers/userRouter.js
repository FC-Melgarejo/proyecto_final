const { Router } = require('express');  
const UsersController = require('../controllers/usersController');




const userRouter = new Router(); 



userRouter.post('/register', UsersController.register.bind(UsersController));

userRouter.post('/login', UsersController.login.bind(UsersController));
userRouter.get('/failregister', UsersController.failRegister.bind(UsersController));
userRouter.get('/faillogin', UsersController.failLogin.bind(UsersController));
userRouter.post('/login', UsersController.login.bind(UsersController));
userRouter.post('/recovery-password', UsersController.recoveryPassword.bind(UsersController));

module.exports = userRouter;



