const UserManager = require('../dao/UserManagerMongo');
const ViewsService = require('../services/viewsService');
const mongoose = requiere ('mongoose')

class ViewsController {
    constructor(viewsService) {
        this.viewsService = viewsService;
    }

    async renderLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }

            const user = await UserManager.getUserByEmail(email);

            if (user) {
                return res.status(401).json({ error: 'El usuario ya existe' });
            }

            const view = this.viewsService.renderLogin();
            res.render(view);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al renderizar la vista');
        }
    }

    recoveryPassword(req, res) {
        try {
            const view = this.viewsService.recoveryPassword();
            res.render(view);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al renderizar la vista');
        }
    }

    renderProfile(req, res) {
        try {
            const view = this.viewsService.renderProfile(req.session.user);
            res.render(view.view, view.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al renderizar la vista');
        }
    }

    async renderAllProducts(req, res) {
        try {
            const view = await this.viewsService.renderAllProducts();
            res.render(view.view, view.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al renderizar la vista');
        }
    }

    async renderRealTimeProducts(req, res) {
        const limit = req.query.limit;
        try {
            const view = await this.viewsService.renderRealTimeProducts(limit);
            if (view.redirect) {
                return res.redirect(view.redirect);
            }
            res.render(view.view, view.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al renderizar la vista');
        }
    }

    renderChat(req, res) {
        try {
            const view = this.viewsService.renderChat();
            res.render(view.view, view.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al renderizar la vista');
        }
    }

    renderError(req, res) {
        const errorMessage = req.query.message || 'Ha ocurrido un error';
        try {
            const view = this.viewsService.renderError(errorMessage);
            res.render(view.view, view.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al renderizar la vista');
        }
    }
}

module.exports = ViewsController;

