const express = require('express');
const ViewsController = require('../controllers/viewsController');

const router = express.Router();
const viewsController = new ViewsController();

router.get('/register', viewsController.renderRegister);
router.get('/login', viewsController.renderLogin);
router.get('/chat', viewsController.renderChat);
router.get('/error', viewsController.renderError);
// Add routes for other views as needed

module.exports = router;






