import React, { useEffect, useState } from 'react';
import { adminService } from '../../api/admin.service';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await adminService.getPendingProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to fetch pending products.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (productId, status) => {
        try {
            await adminService.verifyProduct(productId, status);
            // Optimistic update
            setProducts(products.filter(p => p.id !== productId));
            alert(`Product ${status} successfully!`);
        } catch (err) {
            console.error(err);
            alert(`Failed to ${status} product.`);
        }
    };

    if (loading) return <div>Loading pending products...</div>;

    return (
        <div>
            <h1>Product Moderation</h1>
            {products.length === 0 ? (
                <p>No pending products found.</p>
            ) : (
                <div style={styles.grid}>
                    {products.map(product => (
                        <div key={product.id} style={styles.card}>
                            <div style={styles.cardContent}>
                                <h3>{product.name}</h3>
                                <p><strong>Price:</strong> ${product.price}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p style={styles.desc}>{product.description}</p>
                            </div>
                            <div style={styles.actions}>
                                <button
                                    onClick={() => handleVerify(product.id, 'APPROVED')}
                                    style={styles.approveBtn}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleVerify(product.id, 'REJECTED')}
                                    style={styles.rejectBtn}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' },
    card: { border: '1px solid #eee', borderRadius: '8px', padding: '1rem', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    cardContent: { marginBottom: '1rem' },
    desc: { fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' },
    actions: { display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' },
    approveBtn: { padding: '0.5rem 1rem', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    rejectBtn: { padding: '0.5rem 1rem', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ProductManagement;
