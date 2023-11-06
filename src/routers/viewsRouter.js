const express = require('express');
const ViewsController = require('../controllers/viewsController');
const ViewsService = require('../services/viewsService');

const router = express.Router();
const viewsService = new ViewsService();
const viewsController = new ViewsController


router.get('/login', viewsController.renderLogin.bind(viewsController));
router.get('/recovery-password', viewsController.recoveryPassword.bind(viewsController));
router.get('/profile', viewsController.renderProfile.bind(viewsController));
router.get('/all-products', viewsController.renderAllProducts.bind(viewsController));
router.get('/real-time-products', viewsController.renderRealTimeProducts.bind(viewsController));
router.get('/chat', viewsController.renderChat.bind(viewsController));
router.get('/error', viewsController.renderError.bind(viewsController));


module.exports = router;




