const { Router } = require('express');
const CartsController = require('../controllers/cartsController');

const cartRouter = new Router();
const cartsController = new CartsController();

const usersMiddleware = new UserMiddleware();

//Usuarios logueados pueden consultar juguetes
//Solo usuarios gerente pueden editar juguetes
//Solo el Admin puede crear o borrar juguetes
// Aqui se maneja los  tre tipo de roles y sus respectivos permisos

cartRouter.get('/',
usersMiddleware.isAuth.bind(usersMiddleware),
cartsController.getAll.bind(cartsController))

cartRouter.get('/:id',
usersMiddleware.isAuth.bind(usersMiddleware),
 cartsController.get.bind(cartsController))


cartRouter.post('/',
usersMiddleware.isAuth.bind(usersMiddleware),
usersMiddleware.hasRole('ADMIN'), 
cartsController.create.bind(cartsController)),


cartRouter.put('/:id',
usersMiddleware.isAuth.bind(usersMiddleware),
usersMiddleware.hasRole('MANAGER','USER'),
 cartsController.update.bind(cartsController))

cartRouter.delete('/:id',
usersMiddleware.isAuth.bind(usersMiddleware),
usersMiddleware.hasRole('ADMIN'),
 cartsController.delete.bind(cartsController)),

module.exports = cartRouter;




