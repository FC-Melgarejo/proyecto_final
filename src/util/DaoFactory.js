const UserManager = require('../dao/UserManagerMongo');
const ProductManager = require('../dao/ProductManagerMongo');
const CartManager = require('../dao/CartsManagerMongo');
const MessageManager = require('../dao/MessageManagerMongo');

class DAOFactory {
    static getManager(entity) {
        switch(entity) {
            case 'user':
                return new UserManager();
            case 'product':
                return new ProductManager();
            case 'cart':
                return new CartManager();
            case 'message':
                return new MessageManager();
            default:
                throw new Error('Entidad no válida');
        }
    }
}

module.exports = DAOFactory;
