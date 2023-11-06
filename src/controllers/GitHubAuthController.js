// GitHubAuthController.js
const passport = require('passport');

class GitHubAuthController {
  githubLogin(req, res) {
    passport.authenticate('github', {
      scope: ['user:email']
    })(req, res);
  }

  githubCallback(req, res, next) {
    passport.authenticate('github', {
      failureRedirect: '/login'
    })(req, res, next);
  }
}

module.exports = new GitHubAuthController();
