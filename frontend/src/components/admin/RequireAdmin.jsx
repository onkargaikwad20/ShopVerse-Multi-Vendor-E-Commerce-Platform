import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAdmin = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (user?.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequireAdmin;
