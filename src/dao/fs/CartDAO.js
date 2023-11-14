const fs = require('fs');

class CartDAO {
    constructor(path) {
        this.path = path;
    }

    async createCart(newCart) {
        try {
            const carts = await this.getCarts();
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log('Error al agregar el carrito', error);
            throw error;
        }
    }

    async getCarts() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, '[]');
            }
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al obtener los carritos', error);
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((cart) => cart.id === id);
            if (!cart) {
                throw new Error('No se encuentra el carrito');
            }
            return cart;
        } catch (error) {
            console.log('Error al obtener el carrito por ID', error);
            throw error;
        }
    }

    async updateCart(updatedCart) {
        try {
            const carts = await this.getCarts();
            const index = carts.findIndex((cart) => cart.id === updatedCart.id);
            if (index === -1) {
                throw new Error('No se encuentra el carrito a actualizar');
            }
            carts[index] = updatedCart;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log('Error al actualizar el carrito', error);
            throw error;
        }
    }

    async deleteCart(id) {
        try {
            const carts = await this.getCarts();
            const index = carts.findIndex((cart) => cart.id === id);
            if (index === -1) {
                throw new Error('No se encuentra el carrito a eliminar');
            }
            carts.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log('Error al eliminar el carrito', error);
            throw error;
        }
    }
}

module.exports = CartDAO;
