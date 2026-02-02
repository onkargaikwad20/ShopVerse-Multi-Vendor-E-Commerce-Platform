import React, { useEffect, useState } from 'react';
import { adminService } from '../../api/admin.service';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h1>User Management</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Role</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td style={styles.td}>{user.userId}</td>
                            <td style={styles.td}>{user.fullName}</td>
                            <td style={styles.td}>{user.email}</td>
                            <td style={styles.td}>{user.role}</td>
                            <td style={styles.td}>
                                <button style={styles.actionBtn}>Block</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '2px solid #ddd', backgroundColor: '#f8f9fa' },
    td: { padding: '1rem', borderBottom: '1px solid #eee' },
    actionBtn: { padding: '0.4rem 0.8rem', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default UserManagement;
