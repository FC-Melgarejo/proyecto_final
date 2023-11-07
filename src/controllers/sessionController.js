const userModel = require('../dao/models/userModel');
const mongoose= requiere ('mongoose')
const { generateToken } = require('../util/jwt');
const { createHash, isValidPassword } = require('../util/passwordHash');

class SessionController {
    
    async githubLogin(req, res) {
        passport.authenticate('github', {
            scope: ['user:email']
        })(req, res);
    }

    async githubCallback(req, res, next) {
        passport.authenticate('github', {
            failureRedirect: '/login'
        })(req, res, next);
    }
}


module.exports = new SessionController();

