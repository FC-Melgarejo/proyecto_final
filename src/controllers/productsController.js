const ProductRepository = require('../repositories/productRepository');
const ProductManagerMongo = require('../dao/ProductManagerMongo');

class ProductsController {
    constructor(io) {
        this.productRepository = new ProductRepository();
        this.productManager = new ProductManagerMongo(io);
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los productos', message: error.message });
        }
    }

    async getProductById(req, res) {
        const productId = req.params.pid;
        try {
            const product = await this.productRepository.getProductById(productId);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto', message: error.message });
        }
    }

    async addProduct(req, res) {
        try {
            const { name, price } = req.body;
            const newProduct = await this.productManager.addProduct(name, price);
            res.json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el producto', message: error.message });
        }
    }

    async updateProduct(req, res) {
        const productId = req.params.pid;
        const { name, price } = req.body;
        try {
            await this.productManager.updateProduct(productId, name, price);
            res.json({ message: 'Producto actualizado con éxito' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el producto', message: error.message });
        }
    }

    async deleteProduct(req, res) {
        const productId = req.params.pid;
        try {
            await this.productManager.deleteProduct(productId);
            res.json({ message: 'Producto eliminado con éxito' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto', message: error.message });
        }
    }
}

module.exports = ProductsController;






