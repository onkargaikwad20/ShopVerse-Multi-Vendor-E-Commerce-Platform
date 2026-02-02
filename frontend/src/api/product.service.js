import api from './axios';

export const productService = {
    getAllProducts: async () => {
        const response = await api.get('/product-service/api/product');
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/product-service/api/product/${id}`);
        return response.data;
    },

    // Seller only
    addProduct: async (data, sellerId, shopId) => {
        const payload = { ...data, sellerId, shopId };
        const response = await api.post('/product-service/api/product/add', payload);
        return response.data;
    },

    getSellerProducts: async (sellerId) => {
        const response = await api.get(`/product-service/api/product/seller/${sellerId}`);
        return response.data;
    },

    updateProduct: async (id, productData) => {
        return api.put(`/product-service/api/product/${id}`, productData);
    },

    deleteProduct: async (id) => {
        return api.delete(`/product-service/api/product/${id}`);
    },

    getProductsByCategory: async (category) => {
        return api.get(`/product-service/api/product/category/${category}`);
    }
};
