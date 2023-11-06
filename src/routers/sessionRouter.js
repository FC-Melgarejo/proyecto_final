const express = require('express');
const gitHubAuthController = require('../controllers/GitHubAuthController');
const UserMiddleware = require('../middleware/usersMiddleware');
const passport = require('passport');

const sessionRouter = express.Router();
const usersMiddleware = new UserMiddleware();


sessionRouter.get('/register', (req, res) => {
    res.render('register'); 
  });
  
  sessionRouter.get('/github',
  gitHubAuthController.githubLogin.bind(gitHubAuthController)
);

sessionRouter.get('/github/callback',
  gitHubAuthController.githubCallback.bind(gitHubAuthController),
  (req, res) => {
    // Personaliza lo que sucede después de la autenticación exitosa
    res.redirect('/');
  }
);
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {

})

sessionRouter.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login'}), async (req, res) => {
  return res.json(req.user)
})



module.exports = sessionRouter;



