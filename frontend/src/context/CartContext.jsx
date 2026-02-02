import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '../api/cart.service';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCart = async () => {
        if (!isAuthenticated || !user?.userId) {
            setCart(null);
            setCartCount(0);
            return;
        }

        try {
            const data = await cartService.getCart(user.userId);
            setCart(data);
            // Calculate total items count
            const count = data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
            setCartCount(count);
        } catch (error) {
            console.error("Failed to fetch cart", error);
            setCart(null);
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [isAuthenticated, user]);

    const addToCart = async (item) => {
        if (!isAuthenticated) return;
        setIsLoading(true);
        try {
            await cartService.addToCart(user.userId, item);
            await fetchCart();
            return true;
        } catch (error) {
            console.error("Add to cart failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        if (!isAuthenticated) return;
        try {
            await cartService.removeFromCart(user.userId, itemId);
            await fetchCart();
        } catch (error) {
            console.error("Remove from cart failed", error);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (!isAuthenticated) return;
        try {
            await cartService.updateItemQuantity(user.userId, itemId, quantity);
            await fetchCart();
        } catch (error) {
            console.error("Update quantity failed", error);
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated) return;
        try {
            await cartService.clearCart(user.userId);
            setCart(null);
            setCartCount(0);
        } catch (error) {
            console.error("Clear cart failed", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, refreshCart: fetchCart, isLoading }}>
            {children}
        </CartContext.Provider>
    );
};
