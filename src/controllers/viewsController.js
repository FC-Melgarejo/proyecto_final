// viewsController.js
class ViewsController {
    renderRegister(req, res) {
        res.render('register.hbs');
    }

    renderLogin(req, res) {
        res.render('login.hbs');
    }

    renderChat(req, res) {
        res.render('chat.hbs');
    }

    renderError(req, res) {
        const errorMessage = req.query.message || 'Ha ocurrido un error';
        res.render('error.hbs', { errorMessage });
    }

    // Otros métodos para renderizar diferentes vistas
}

module.exports = ViewsController;


