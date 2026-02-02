import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h3 style={styles.logo}>ShopVerse Admin</h3>
                <nav style={styles.nav}>
                    <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
                    <Link to="/admin/users" style={styles.link}>Users</Link>
                    <Link to="/admin/sellers" style={styles.link}>Sellers</Link>
                    <Link to="/admin/products" style={styles.link}>Products</Link>
                </nav>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </aside>
            <main style={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

const styles = {
    container: { display: 'flex', height: '100vh', backgroundColor: '#f4f4f9' },
    sidebar: { width: '250px', backgroundColor: '#2c3e50', color: '#fff', display: 'flex', flexDirection: 'column', padding: '1rem' },
    logo: { marginBottom: '2rem', textAlign: 'center', color: '#00d4ff' },
    nav: { display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 },
    link: { color: '#ecf0f1', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', transition: 'background 0.3s' },
    logoutBtn: { padding: '0.5rem', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    main: { flex: 1, padding: '2rem', overflowY: 'auto' }
};

export default AdminLayout;
