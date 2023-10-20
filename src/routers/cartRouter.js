const { Router } = require('express');
const CartController = require('../controllers/cartsControlles');

const cartRouter = new Router();
const cartController = new CartController();

cartRouter.get('/', cartController.getCarts.bind(cartController));
cartRouter.get('/:cid', cartController.getCartById.bind(cartController));
cartRouter.post('/', cartController.addCart.bind(cartController));
cartRouter.post('/:cid/:pid', cartController.addProductToCart.bind(cartController));
cartRouter.delete('/:cid/products/:pid', cartController.removeProductFromCart.bind(cartController));
cartRouter.put('/:cid', cartController.updateCartProducts.bind(cartController));
cartRouter.put('/:cid/products/:pid', cartController.updateProductQuantity.bind(cartController));
cartRouter.delete('/:cid', cartController.clearCart.bind(cartController));

module.exports = cartRouter;



