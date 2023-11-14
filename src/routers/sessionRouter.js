
const { Router } = require('express');  
const SessionController = require('../controllers/sessionController');


const sessionController = new SessionController();
const sessionRouter = new Router();

sessionRouter.get('/github-login', sessionController.githubLogin.bind(sessionController));
sessionRouter.get('/github-callback', sessionController.githubCallback.bind(sessionController));
sessionRouter.post('/login', sessionController.login.bind(sessionController));
sessionRouter.get('/logout', sessionController.logout.bind(sessionController));

module.exports = sessionRouter;






