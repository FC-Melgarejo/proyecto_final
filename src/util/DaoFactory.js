const CartManager = require('../dao/fs/CartManager');
const ProductManager = require('../dao/fs/ProductManager');
const UserManager = require('../dao/fs/userManager');
const CartManagerMongo = require('../dao/CartsManagerMongo');
const ProductManagerMongo = require('../dao/ProductManagerMongo');
const UserManagerMongo = require('../dao/UserManagerMongo');

class DAOFactory {
    static getDAO(daoType) {
        switch (daoType) {
            case 'fs':
                return {
                    CartManager: new CartManager(),
                    ProductManager: new ProductManager(),
                    UserManager: new UserManager()
                };
            case 'mongo':
                return {
                    CartManager: new CartManagerMongo(),
                    ProductManager: new ProductManagerMongo(),
                    UserManager: new UserManagerMongo()
                };
            default:
                throw new Error('Tipo de DAO no soportado');
        }
    }
}

module.exports = DAOFactory;

