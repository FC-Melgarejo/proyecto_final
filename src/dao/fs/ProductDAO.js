const fs = require('fs');
const generateId = require('../../utils/io');

class ProductDAO {
    constructor(path) {
        this.path = path;
    }

    async getAllProducts() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, '[]');
            }
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al obtener los productos', error);
            throw error;
        }
    }

    async addProduct(newProduct) {
        try {
            const products = await this.getAllProducts();
            const exist = products.find((product) => product.code === newProduct.code);
            if (exist) {
                throw new Error(`Ya existe un producto con el código '${newProduct.code}'`);
            }

            const newId = generateId();
            newProduct.id = newId;

            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

            return newProduct;
        } catch (error) {
            console.log('Error al agregar el producto', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getAllProducts();
            const product = products.find((product) => product.id === id);
            if (!product) {
                throw new Error(`El Producto con el ID ${id} no existe`);
            }
            return product;
        } catch (error) {
            console.log('Error al obtener el producto por ID', error);
            throw error;
        }
    }

    async updateProduct(updatedProduct) {
        try {
            const products = await this.getAllProducts();
            const index = products.findIndex((product) => product.id === updatedProduct.id);
            if (index === -1) {
                throw new Error('No se encuentra el producto a actualizar');
            }
            products[index] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log('Error al actualizar el producto', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getAllProducts();
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) {
                throw new Error('No se encuentra el producto a eliminar');
            }
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log('Error al borrar el producto', error);
            throw error;
        }
    }
}

module.exports = ProductDAO;
