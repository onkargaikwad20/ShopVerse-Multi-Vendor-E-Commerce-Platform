import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                <div style={styles.card}>
                    <h3>Total Users</h3>
                    <p style={styles.number}>120</p>
                </div>
                <div style={styles.card}>
                    <h3>Total Sales</h3>
                    <p style={styles.number}>$45,000</p>
                </div>
                <div style={styles.card}>
                    <h3>Pending Sellers</h3>
                    <p style={styles.number}>5</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    number: { fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }
};

export default AdminDashboard;
