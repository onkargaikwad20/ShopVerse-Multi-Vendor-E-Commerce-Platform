import axios from 'axios';

const API_URL = 'http://localhost:8080/admin-service/api/admin';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const adminService = {
    getAllUsers: async () => {
        const response = await axios.get(`${API_URL}/users`, getAuthHeader());
        return response.data;
    },

    getPendingSellers: async () => {
        const response = await axios.get(`${API_URL}/sellers/pending`, getAuthHeader());
        return response.data;
    },

    verifySeller: async (sellerId, status) => {
        const response = await axios.put(`${API_URL}/sellers/${sellerId}/verify`, { status }, getAuthHeader());
        return response.data;
    },

    getPendingProducts: async () => {
        const response = await axios.get(`${API_URL}/products/pending`, getAuthHeader());
        return response.data;
    },

    verifyProduct: async (productId, status) => {
        const response = await axios.put(`${API_URL}/products/${productId}/verify`, { status }, getAuthHeader());
        return response.data;
    }
};
