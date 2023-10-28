const { Router } = require('express');
const viewsService = require('../services/viewsService');
const viewsControllers = require('../controllers/viewsController');

const viewsRouter = new Router();
const viewsServiceInstance = new viewsService();

viewsRouter.get('/register', viewsControllers.renderRegister);
console.log('renderizando registro');
viewsRouter.get('/login', viewsControllers.renderLogin);
viewsRouter.get('/recovery-password', viewsControllers.renderRecoveryPassword);
viewsRouter.get('/profile', viewsControllers.renderProfile);
viewsRouter.get('/products/allProducts', viewsControllers.renderAllProducts);
viewsRouter.get('/realtime-products', viewsControllers.renderRealTimeProducts);
viewsRouter.get('/chat', viewsControllers.renderChat);
viewsRouter.get('/error', viewsControllers.renderError);

module.exports = viewsRouter;



