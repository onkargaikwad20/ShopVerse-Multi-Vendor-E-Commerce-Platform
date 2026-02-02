import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../api/order.service';

const Orders = () => {
    const { user, isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.userId) return;

            try {
                const data = await orderService.getMyOrders(user.userId);
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                    console.error("Received invalid orders data:", data);
                }
            } catch (err) {
                console.error("Failed to fetch orders", err);
                setError('Failed to load your orders. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchOrders();
        } else {
            setIsLoading(false);
        }
    }, [user, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                    <Package className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h2>
                <p className="text-gray-500 mb-8 text-center max-w-sm">You need to be logged in to view your order history.</p>
                <Link to="/login">
                    <Button size="lg">Sign In</Button>
                </Link>
            </div>
        );
    }

    if (isLoading) {
        return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary-600" /></div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                    <Package className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-8 text-center max-w-sm">You haven't placed any orders yet. Start shopping to fill your history!</p>
                <Link to="/shop">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <div>
                                    <span className="block font-medium text-gray-900">Order ID</span>
                                    <span>#{order.id}</span>
                                </div>
                                <div>
                                    <span className="block font-medium text-gray-900">Date Placed</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span className="block font-medium text-gray-900">Total Amount</span>
                                    <span className="font-semibold text-gray-900">₹{order.totalAmount?.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                    ${order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Order Items Preview - showing just first few or summary */}
                        <div className="px-6 py-4">
                            <ul className="divide-y divide-gray-100">
                                {order.items && order.items.map((item) => (
                                    <li key={item.id} className="flex py-3 items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Ideally we have image URL in order item, or generic icon */}
                                            <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                                                <Package className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
