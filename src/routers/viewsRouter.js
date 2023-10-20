const { Router } = require('express');
const viewsService = require('../services/viewsService');
const viewsController = require('../controllers/viewsControllers');

const viewsRouter = new Router();
const viewsServiceInstance = new viewsService();
const viewControllerInstance = new viewsController(viewsServiceInstance);

viewsRouter.get('/register', viewControllerInstance.renderRegister.bind(viewControllerInstance));
viewsRouter.get('/login', viewControllerInstance.renderLogin.bind(viewControllerInstance));
viewsRouter.get('/recovery-password', viewControllerInstance.renderRecoveryPassword.bind(viewControllerInstance));
viewsRouter.get('/profile', viewControllerInstance.renderProfile.bind(viewControllerInstance));
viewsRouter.get('/products/allProducts', viewControllerInstance.renderAllProducts.bind(viewControllerInstance));
viewsRouter.get('/realtime-products', viewControllerInstance.renderRealTimeProducts.bind(viewControllerInstance));
viewsRouter.get('/chat', viewControllerInstance.renderChat.bind(viewControllerInstance));
viewsRouter.get('/error', viewControllerInstance.renderError.bind(viewControllerInstance));

module.exports = viewsRouter;


