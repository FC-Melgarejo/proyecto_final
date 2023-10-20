const { Router } = require('express');
const ProductManagerController = require('../controllers/productsControllers');

const productManagerRouter = new Router();
const productManagerController = new ProductManagerController();

productManagerRouter.get('/', productManagerController.getProducts.bind(productManagerController));
productManagerRouter.get('/:pid', productManagerController.getProductById.bind(productManagerController));
productManagerRouter.post('/', productManagerController.addProduct.bind(productManagerController));
productManagerRouter.put('/:pid', productManagerController.updateProduct.bind(productManagerController));
productManagerRouter.delete('/:pid', productManagerController.deleteProduct.bind(productManagerController));

module.exports = productManagerRouter;



