class ViewsService {
    renderRegister() {
        return 'register';
    }

    renderLogin() {
        return 'login';
    }

    renderRecoveryPassword() {
        return 'recovery-password';
    }

    renderProfile(user) {
        if (!user) {
            return '/login';
        }

        return { view: 'profile', data: { user } };
    }

    async renderAllProducts() {
        try {
            const products = await productManager.getProducts();
            return { view: 'products/allProducts', data: { products, cartId: 'your_cart_id' } };
        } catch (error) {
            return { error: 'Error al obtener los productos', message: error.message };
        }
    }

    async renderRealTimeProducts(limit) {
        try {
            const products = await productManager.getProducts();

            if (products.length === 0) {
                return { view: 'realtime-products', data: { title: 'Productos en Tiempo Real', noProducts: true } };
            }

            if (limit) {
                const limitedProducts = products.slice(0, parseInt(limit));
                return { view: 'realtime-products', data: { title: 'Productos en Tiempo Real', products: limitedProducts } };
            }

            return { view: 'realtime-products', data: { title: 'Productos en Tiempo Real', products } };
        } catch (error) {
            return { redirect: '/error?message=Error al obtener los productos en tiempo real' };
        }
    }

    renderChat() {
        return { view: 'chat', data: { title: 'Chat', style: 'styles.css' } };
    }

    renderError(message = 'Ha ocurrido un error') {
        return { view: 'error', data: { title: 'Error', errorMessage: message } };
    }
}

module.exports = ViewsService;
