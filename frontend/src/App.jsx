import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import BecomeSeller from './pages/BecomeSeller';
import SellerDashboard from './pages/SellerDashboard';
import PaymentResult from './pages/PaymentResult';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Offers from './pages/Offers';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SellerManagement from './pages/admin/SellerManagement';
import ProductManagement from './pages/admin/ProductManagement';
import RequireAdmin from './components/admin/RequireAdmin';

import { AuthProvider } from './context/AuthContext';
// ... imports

import { CartProvider } from './context/CartContext';

// ... imports

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="sellers" element={<SellerManagement />} />
              <Route path="products" element={<ProductManagement />} />
            </Route>

            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/payment/success" element={<PaymentResult />} />
            <Route path="/payment/cancel" element={<PaymentResult />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
