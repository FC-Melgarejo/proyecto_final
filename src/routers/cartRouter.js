const { Router } = require('express');
const CartsController = require('../controllers/cartsController');

const cartRouter = new Router();
const cartsController = new CartsController();

cartRouter.get('/', cartsController.getCarts.bind(cartsController));
cartRouter.get('/:cid', cartsController.getCartById.bind(cartsController));
cartRouter.post('/:cid/:pid', cartsController.addProductToCart.bind(cartsController));
cartRouter.delete('/:cid/products/:pid', cartsController.removeProductFromCart.bind(cartsController));
cartRouter.put('/:cid/products/:pid', cartsController.updateProductQuantity.bind(cartsController));
cartRouter.delete('/:cid', cartsController.clearCart.bind(cartsController));

module.exports = cartRouter;




