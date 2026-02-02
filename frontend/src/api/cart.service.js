import api from './axios';

export const cartService = {
    getCart: async (userId) => {
        const response = await api.get('/cart-service/api/cart', {
            headers: { 'X-User-Id': userId }
        });
        return response.data;
    },

    addToCart: async (userId, item) => {
        const response = await api.post('/cart-service/api/cart/add', item, {
            headers: { 'X-User-Id': userId }
        });
        return response.data;
    },

    removeFromCart: async (userId, itemId) => {
        const response = await api.delete(`/cart-service/api/cart/remove/${itemId}`, {
            headers: { 'X-User-Id': userId }
        });
        return response.data;
    },

    updateItemQuantity: async (userId, itemId, quantity) => {
        const response = await api.put(`/cart-service/api/cart/update/${itemId}?quantity=${quantity}`, {}, {
            headers: { 'X-User-Id': userId }
        });
        return response.data;
    },

    clearCart: async (userId) => {
        await api.delete('/cart-service/api/cart/clear', {
            headers: { 'X-User-Id': userId }
        });
    }
};
