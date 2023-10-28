const { Router } = require('express');
const ProductsController = require('../controllers/productsController');

const productRouter = new Router();
const productsController = new ProductsController();

productRouter.get('/', productsController.getAllProducts.bind(productsController));
productRouter.get('/:pid', productsController.getProductById.bind(productsController));
productRouter.post('/', productsController.addProduct.bind(productsController));
productRouter.put('/:pid', productsController.updateProduct.bind(productsController));
productRouter.delete('/:pid', productsController.deleteProduct.bind(productsController));

module.exports = productRouter;





 



