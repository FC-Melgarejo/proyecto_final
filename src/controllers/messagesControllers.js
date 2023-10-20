const UserManagerService = require('../services/messagesService');

class UserManagerController {
    constructor() {
        this.service = new UserManagerService();
    }

    async createUser(req, res) {
        const userData = req.body;
        try {
            await this.service.createUser(userData);
            res.status(201).json({ status: 'success', message: 'Usuario creado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el usuario', message: error.message });
        }
    }

    async authenticateUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.service.authenticateUser(email, password);
            res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
            res.status(401).json({ error: 'Error de autenticación', message: error.message });
        }
    }

    async checkAdminStatus(req, res) {
        const { email } = req.params;
        try {
            const isAdmin = await this.service.isAdmin(email);
            res.status(200).json({ status: 'success', payload: { isAdmin } });
        } catch (error) {
            res.status(500).json({ error: 'Error al verificar el estado de administrador', message: error.message });
        }
    }
}

module.exports = UserManagerController;
