import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/auth.service';
import { userService } from '../api/user.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const initAuth = async () => {
            const currentUser = authService.getCurrentUser();
            const token = localStorage.getItem('token');

            if (currentUser && token) {
                // 1. Logged in user
                try {
                    // Fetch full profile to get email
                    const profile = await userService.getProfile();
                    setUser({ ...currentUser, ...profile });
                } catch (err) {
                    console.error("Failed to refresh profile on init", err);
                    setUser(currentUser);
                }
                setIsAuthenticated(true);
            } else if (!token) {
                // 2. No token at all -> Get Guest Token
                try {
                    await authService.guestLogin();
                } catch (error) {
                    console.error("Failed to get guest token", error);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (phone, password) => {
        const data = await authService.login(phone, password);
        let userProfile = { userId: data.userId, role: data.role };

        try {
            // Fetch profile immediately after login to get email
            const profile = await userService.getProfile();
            userProfile = { ...userProfile, ...profile };
        } catch (e) {
            console.warn("Could not fetch profile after login", e);
        }

        setUser(userProfile);
        // Update local storage with full profile so we have email persists
        localStorage.setItem('user', JSON.stringify(userProfile));

        setIsAuthenticated(true);
        return data;
    };

    const register = async (phone, password) => {
        return authService.register(phone, password);
    };

    const verifyOtp = async (phone, otp) => {
        const data = await authService.verifyOtp(phone, otp);
        // Only return data, do not set user state
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, verifyOtp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
