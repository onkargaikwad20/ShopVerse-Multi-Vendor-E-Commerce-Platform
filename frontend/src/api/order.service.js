import api from './axios';

export const orderService = {
    createOrder: async (orderData, email) => {
        const response = await api.post(`/order-service/api/orders?email=${email}`, orderData);
        return response.data;
    },

    getOrderById: async (id) => {
        const response = await api.get(`/order-service/api/orders/${id}`);
        return response.data;
    },

    getMyOrders: async (userId) => {
        const response = await api.get(`/order-service/api/orders/user/${userId}`);
        return response.data;
    }
};
