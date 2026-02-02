import api from './axios';

export const sellerService = {
    createSellerProfile: async (data) => {
        // data: { name, email, phone, address, businessDetails }
        const response = await api.post('/seller-service/api/seller/create-profile', data);
        return response.data;
    },

    createShop: async (data) => {
        const response = await api.post('/seller-service/api/seller/create-shop', data);
        return response.data;
    },

    getDashboard: async () => {
        const response = await api.get('/seller-service/api/seller/dashboard');
        return response.data;
    }
};
