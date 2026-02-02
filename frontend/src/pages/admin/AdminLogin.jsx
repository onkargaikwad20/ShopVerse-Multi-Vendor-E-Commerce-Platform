import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLogin = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/admin/dashboard";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(phone, password);
            if (data.role === 'ADMIN') {
                navigate(from, { replace: true });
            } else {
                setError('Access Denied: You are not an Admin.');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Admin Portal</h2>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Phone (e.g., 9999999999)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a', color: '#fff' },
    card: { padding: '2rem', backgroundColor: '#2d2d2d', borderRadius: '8px', width: '300px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' },
    title: { textAlign: 'center', marginBottom: '1.5rem', color: '#00d4ff' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: '#fff' },
    button: { padding: '0.8rem', borderRadius: '4px', border: 'none', backgroundColor: '#00d4ff', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
    error: { color: '#ff4d4d', textAlign: 'center', marginBottom: '1rem' }
};

export default AdminLogin;
