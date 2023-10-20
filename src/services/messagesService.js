const UserManager = require('../dao/UserManagerMongo');

class UserManagerService {
    constructor() {
        this.manager = new UserManager();
    }

    async createUser(data) {
        try {
            await this.manager.createUser(data);
        } catch (error) {
            throw error;
        }
    }

    async authenticateUser(email, password) {
        try {
            return await this.manager.authenticateUser(email, password);
        } catch (error) {
            throw error;
        }
    }

    async isAdmin(email) {
        try {
            return await this.manager.isAdmin(email);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserManagerService;

