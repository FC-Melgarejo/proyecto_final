const { Router } = require('express');
const CartsController = require('../controllers/cartsController');
const UserMiddleware = require('../middleware/usersMiddleware');


const cartRouter = new Router();
const cartsController = new CartsController();

const usersMiddleware = new UserMiddleware();

//Usuarios logueados pueden consultar juguetes
//Solo usuarios gerente pueden editar juguetes
//Solo el Admin puede crear o borrar juguetes
// Aqui se maneja los  tre tipo de roles y sus respectivos permisos

cartRouter.get('/',
usersMiddleware.isAuth.bind(usersMiddleware),
cartsController.getCarts.bind(cartsController))

cartRouter.get('/:id',
usersMiddleware.isAuth.bind(usersMiddleware),
 cartsController.getCartById.bind(cartsController))

cartRouter.post('/',
  usersMiddleware.isAuth.bind(usersMiddleware),
  cartsController.createCart.bind(cartsController)
),

cartRouter.put('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  cartsController.updateCart.bind(cartsController)
)

cartRouter.delete('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'),
  cartsController.removeProductFromCart.bind(cartsController)
),

cartRouter.delete('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'),
  cartsController.clearCart.bind(cartsController)
),

module.exports = cartRouter;




