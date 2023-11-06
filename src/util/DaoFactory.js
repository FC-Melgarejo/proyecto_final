const UserManager = require('../dao/UserManagerMongo');
const ProductManager = require('../dao/ProductManagerMongo');
const CartManager = require('../dao/CartsManagerMongo');
const MessageManager = require('../dao/MessageManagerMongo');

class DAOFactory {
    static getManager(entity) {
        console.log(`Solicitando manager para la entidad: ${entity}`);
        console.log('Hola, este es un mensaje de prueba');

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
