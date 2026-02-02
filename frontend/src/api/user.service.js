import api from './axios';

export const userService = {
    updateProfile: async (data, token = null) => {
        // data: { name, email, address }
        const config = {};
        if (token) {
            config.headers = { Authorization: `Bearer ${token}` };
        }
        const response = await api.put('/user-service/api/user/profile', data, config);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/user-service/api/user/me');
        return response.data;
    }
};
