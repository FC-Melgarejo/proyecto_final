const ProductRepository = require('../repositories/productRepository');
const ProductManagerMongo = require('../dao/ProductManagerMongo');


class ProductsController {
    // Obtener todos los productos
    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los productos', message: error.message });
        }
    }

    // Obtener un producto por su ID
    async getProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto', message: error.message });
        }
    }

    // Crear un nuevo producto
    async createProduct(req, res) {
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = req.body;

            // Verificar que se proporcionaron todos los datos necesarios
            if (!title || !description || !code || !price || status === undefined || stock === undefined || !category) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }

            // Verificar que el precio es un número válido
            if (isNaN(price) || parseFloat(price) <= 0) {
                return res.status(400).json({ error: 'El precio debe ser un número positivo' });
            }

            const newProduct = new Product({
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            });

            await newProduct.save();

            res.json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el producto', message: error.message });
        }
    }

    // Actualizar un producto por su ID
    async updateProduct(req, res) {
        const productId = req.params.id;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el producto', message: error.message });
        }
    }

    // Eliminar un producto por su ID
    async deleteProduct(req, res) {
        const productId = req.params.id;
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.json({ message: 'Producto eliminado con éxito' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto', message: error.message });
        }
    }
}

module.exports = ProductsController;









