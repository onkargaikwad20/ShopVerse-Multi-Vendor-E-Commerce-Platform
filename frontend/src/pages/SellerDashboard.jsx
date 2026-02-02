import React, { useState, useEffect } from 'react';
import { sellerService } from '../api/seller.service';
import { productService } from '../api/product.service';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import CreateShop from '../components/seller/CreateShop';
import AddProduct from '../components/seller/AddProduct';

const SellerDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false);

    const fetchDashboard = async () => {
        try {
            const data = await sellerService.getDashboard();
            setDashboardData(data);
            if (data?.sellerId) {
                const productsData = await productService.getSellerProducts(data.sellerId);
                setProducts(productsData);
            }
        } catch (err) {
            console.error("Failed to fetch dashboard", err);
            setError("Failed to load dashboard data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleShopCreated = () => {
        fetchDashboard();
    };

    const handleProductAdded = () => {
        setShowAddProduct(false);
        fetchDashboard();
    };

    if (isLoading) return <div className="p-8 text-center">Loading dashboard...</div>;
    if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
                <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-md font-medium">
                    KYC Status: {dashboardData?.kycStatus || 'N/A'}
                </div>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.earnings?.currency || '₹'}{dashboardData?.earnings?.totalEarnings || 0}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                    </CardContent>
                </Card>
            </div>

            {/* Shop Section */}
            {!dashboardData?.shop ? (
                <div className="my-8">
                    <CreateShop onShopCreated={handleShopCreated} />
                </div>
            ) : (
                <>
                    <Card className="mb-8">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>{dashboardData.shop.shopName}</CardTitle>
                                <Button onClick={() => setShowAddProduct(true)}>Add Product</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {dashboardData.shop.shopBannerUrl && (
                                <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                                    <img
                                        src={dashboardData.shop.shopBannerUrl}
                                        alt={dashboardData.shop.shopName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <p>{dashboardData.shop.description}</p>
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Categories</h4>
                                <div className="flex gap-2">
                                    {dashboardData.shop.categories?.map(cat => (
                                        <span key={cat} className="bg-gray-100 px-2 py-1 rounded text-xs">{cat}</span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Add Product Modal/Area */}
                    {showAddProduct && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                            <div className="w-full max-w-lg">
                                <AddProduct
                                    sellerId={dashboardData.sellerId}
                                    shopId={dashboardData.shop.shopId} 
                                    onProductAdded={handleProductAdded}
                                    onCancel={() => setShowAddProduct(false)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Products List */}
                    <h2 className="text-2xl font-bold mb-4">Your Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <Card key={product.id} className="overflow-hidden">
                                {product.images && (
                                    <div className="aspect-square w-full overflow-hidden bg-gray-100">
                                        <img src={product.images.split(',')[0]} alt={product.name} className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <CardContent className="p-4">
                                    <h3 className="font-semibold truncate">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">₹{product.price}</span>
                                        <span className="text-xs text-gray-500">Qty: {product.quantity}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {products.length === 0 && <p className="text-gray-500">No products found.</p>}
                    </div>
                </>
            )}
        </div>
    );
};

export default SellerDashboard;
