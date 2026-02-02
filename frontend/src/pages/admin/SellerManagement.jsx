import React, { useEffect, useState } from 'react';
import { adminService } from '../../api/admin.service';

const SellerManagement = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const data = await adminService.getPendingSellers();
            setSellers(data);
        } catch (err) {
            setError('Failed to fetch pending sellers.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (sellerId, status) => {
        try {
            await adminService.verifySeller(sellerId, status);
            setSellers(sellers.filter(s => s.id !== sellerId));
            alert(`Seller ${status} successfully!`);
        } catch (err) {
            console.error(err);
            alert(`Failed to ${status} seller.`);
        }
    };

    if (loading) return <div>Loading details...</div>;
    // if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h1>Pending Seller Approvals</h1>
            {sellers.length === 0 ? (
                <p>No pending sellers found.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Business Details</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map(seller => (
                            <tr key={seller.id}>
                                <td style={styles.td}>{seller.id}</td>
                                <td style={styles.td}>{seller.name}</td>
                                <td style={styles.td}>{seller.email}</td>
                                <td style={styles.td}>{seller.businessDetails}</td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => handleVerify(seller.id, 'APPROVED')}
                                            style={styles.approveBtn}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleVerify(seller.id, 'REJECTED')}
                                            style={styles.rejectBtn}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const styles = {
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    th: { textAlign: 'left', padding: '1rem', borderBottom: '2px solid #ddd', backgroundColor: '#f8f9fa' },
    td: { padding: '1rem', borderBottom: '1px solid #eee' },
    actions: { display: 'flex', gap: '0.5rem' },
    approveBtn: { padding: '0.4rem 0.8rem', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    rejectBtn: { padding: '0.4rem 0.8rem', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default SellerManagement;
