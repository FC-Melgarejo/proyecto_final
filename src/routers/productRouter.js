const { Router } = require('express');
const ProductsController = require('../controllers/productsController');

const productRouter = new Router();
const productsController = new ProductsController();

const usersMiddleware = new UserMiddleware();

//Usuarios logueados pueden consultar juguetes
//Solo usuarios gerente pueden editar juguetes
//Solo el Admin puede crear o borrar juguetes
// Aqui se maneja los  tre tipo de roles y sus respectivos permisos
productRouter.get('/',
usersMiddleware.isAuth.bind(usersMiddleware),
 productsController.getAll.bind(productsController))

productRouter.get('/:id',
usersMiddleware.isAuth.bind(usersMiddleware),
 productsController.get.bind(productsController))


productRouter.post('/',
usersMiddleware.isAuth.bind(usersMiddleware),
usersMiddleware.hasRole('ADMIN'), 
productsController.create.bind(productsController)),


productRouter.put('/:id',
usersMiddleware.isAuth.bind(usersMiddleware),
usersMiddleware.hasRole('MANAGER','USER'),
 productsController.update.bind(productsController))

productRouter.delete('/:id',
usersMiddleware.isAuth.bind(usersMiddleware),
usersMiddleware.hasRole('ADMIN'),
 productsController.delete.bind(productsController)),

module.exports = productRouter;





 



