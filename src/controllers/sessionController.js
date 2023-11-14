const userModel = require('../dao/models/userModel');
const { generateToken } = require('../util/jwt');
const passport = require('passport');

class SessionController {
    
    
    
    githubLogin(req, res) {
        passport.authenticate('github', {
            scope: ['email']
        })(req, res);
    }

    githubCallback(req, res, next) {
        passport.authenticate('github', {
            failureRedirect: '/login'
        })(req, res, next);
    }

    async login(req, res) {
        passport.authenticate('login', { failureRedirect: '/faillogin' })(req, res);

        const token = generateToken({ userId: req.user.id });
        res.json({ token });

        return res.status(204).json({});
    }

    logout(req, res) {
        req.logout(); // Cierra la sesión del usuario
        res.redirect('/'); // Redirige a la página de inicio
    }
}
module.exports = SessionController;


