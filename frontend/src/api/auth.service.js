import api from './axios';

export const authService = {
    login: async (phone, password) => {
        const response = await api.post('/auth-service/api/auth/login', { phone, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                userId: response.data.userId,
                role: response.data.role,
                email: response.data.email
            }));
        }
        return response.data;
    },

    guestLogin: async () => {
        const response = await api.post('/auth-service/api/auth/guest-login');
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (phone, password) => {
        return api.post('/auth-service/api/auth/register', { phone, password });
    },

    verifyOtp: async (phone, otp) => {
        const response = await api.post('/auth-service/api/auth/verify-otp', { phone, otp });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};
