import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, MapPin, Tag, ShieldCheck, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../api/order.service';

const Cart = () => {
    const { cart, cartCount, refreshCart, removeFromCart, updateQuantity, isLoading: isCartLoading } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const calculateTotal = () => {
        if (!cart?.items) return 0;
        return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        await updateQuantity(itemId, newQuantity);
    };

    const handleApplyCoupon = () => {
        alert("Coupon applied! (Mock)");
    };

    const handleChangeAddress = () => {
        alert("Redirecting to Address Management... (Mock)");
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/cart' } });
            return;
        }

        if (!cart?.items || cart.items.length === 0) return;

        setIsCheckingOut(true);
        try {
            const orderData = {
                userId: user.userId,
                productName: `Cart Checkout (${cartCount} items)`,
                quantity: cartCount,
                totalAmount: calculateTotal(),
                items: cart.items.map(item => ({
                    productId: item.productId,
                    productName: item.productName,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            const emailToUse = (user?.email && user.email !== 'undefined') ? user.email : "guest@shopverse.com";

            console.log("DEBUG CHECKOUT - User:", user);
            console.log("DEBUG CHECKOUT - user.email:", user?.email);
            console.log("DEBUG CHECKOUT - emailToUse:", emailToUse);

            console.log("Sending Order Data:", JSON.stringify(orderData, null, 2)); // Debugging

            const response = await orderService.createOrder(orderData, emailToUse);

            if (response.checkoutUrl) {
                window.location.href = response.checkoutUrl;
            }

        } catch (error) {
            console.error("Checkout failed", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (isCartLoading && !cart) {
        return <div className="flex h-[60vh] items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary-600" /></div>;
    }

    if (!cart || cartCount === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-white min-h-[60vh]">
                <div className="w-48 mb-6">
                    <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png" alt="Empty Bag" className="w-full opacity-50" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Hey, it feels so light!</h2>
                <p className="text-gray-500 mb-8 text-sm">There is nothing in your bag. Let's add some items.</p>
                <Link to="/shop">
                    <Button variant="outline" className="text-primary-600 border-primary-600 hover:bg-primary-50 px-8 py-2 font-bold uppercase tracking-wide rounded-sm">
                        Add Items from Wishlist
                    </Button>
                </Link>
            </div>
        );
    }

    const totalAmount = calculateTotal();
    const mrp = totalAmount * 1.2;
    const discount = mrp - totalAmount;

    return (
        <div className="bg-gray-50 min-h-screen pb-12 font-sans">
            {/* Step Indicator */}
            <div className="max-w-4xl mx-auto py-6 flex justify-center items-center gap-4 text-xs font-semibold tracking-wider uppercase text-gray-500 mb-4">
                <span className="text-primary-600 border-b-2 border-primary-600 pb-1">Bag</span>
                <span className="border-t border-dashed border-gray-300 w-12"></span>
                <span>Address</span>
                <span className="border-t border-dashed border-gray-300 w-12"></span>
                <span>Payment</span>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Items */}
                <div className="lg:col-span-8 space-y-4">

                    {/* Address Strip */}
                    <div className="bg-white p-4 rounded-sm border border-gray-200 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-700">Deliver to: <strong className="text-gray-900">User, 123456</strong></span>
                            <span className="bg-gray-100 text-primary-700 px-2 py-0.5 rounded-full text-xs font-bold">HOME</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleChangeAddress} className="text-primary-600 border-primary-600 h-8 text-xs font-bold uppercase rounded-sm">
                            Change Address
                        </Button>
                    </div>

                    {/* Offers Strip */}
                    <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold text-sm">
                            <Tag className="h-4 w-4" /> Available Offers
                        </div>
                        <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 ml-1">
                            <li>10% Instant Discount on HDFC Bank Credit Cards on a min spend of ₹50. TCA</li>
                        </ul>
                    </div>

                    {/* Selected Items */}
                    <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-gray-800 text-sm tracking-wide uppercase">Selected Items ({cartCount})</span>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {cart.items.map((item) => (
                                <div key={item.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors relative">
                                    {/* Image */}
                                    <div className="w-28 h-36 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                                        <img
                                            src={item.imageUrl || 'https://placehold.co/300x400'}
                                            alt={item.productName}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm mb-1">{item.brand || "Brand Name"}</h3>
                                            <p className="text-sm text-gray-600 mb-2 leading-tight">
                                                <Link to={`/product/${item.productId}`} className="hover:text-primary-600">
                                                    {item.productName}
                                                </Link>
                                            </p>
                                            <div className="flex gap-2 text-xs text-gray-500 mb-3 items-center">
                                                <span className="bg-gray-100 px-2 py-1 rounded">Size: M</span>
                                                <div className="flex items-center border border-gray-300 rounded bg-gray-50">
                                                    <button
                                                        className="px-2 py-0.5 hover:bg-gray-200 disabled:opacity-50"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-2 font-medium bg-white">{item.quantity}</span>
                                                    <button
                                                        className="px-2 py-0.5 hover:bg-gray-200"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-900 text-sm">₹{item.price}</span>
                                            <span className="text-xs text-gray-400 line-through">₹{(item.price * 1.2).toFixed(2)}</span>
                                            <span className="text-xs text-orange-500 font-bold">20% OFF</span>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-1"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Price & Coupons */}
                <div className="lg:col-span-4 space-y-4">

                    {/* Coupons */}
                    <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Coupons</div>
                        <div className="flex justify-between items-center cursor-pointer hover:opacity-80" onClick={handleApplyCoupon}>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <Tag className="h-4 w-4" />
                                <span>Apply Coupons</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary-600 font-bold text-xs uppercase hover:bg-transparent px-0">
                                Apply
                            </Button>
                        </div>
                    </div>

                    {/* Price Details */}
                    <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Price Details ({cartCount} Items)</div>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span>Total MRP</span>
                                <span>₹{mrp.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount on MRP</span>
                                <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Coupon Discount</span>
                                <span className="text-primary-600 cursor-pointer" onClick={handleApplyCoupon}>Apply Coupon</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Convenience Fee</span>
                                <div>
                                    <span className="line-through text-gray-400 mr-1">₹2.00</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 my-4"></div>
                        <div className="flex justify-between items-center font-bold text-gray-900 text-lg mb-4">
                            <span>Total Amount</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>

                        <Button
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 uppercase tracking-wider text-sm rounded-sm"
                            disabled={isCheckingOut}
                            onClick={handleCheckout}
                        >
                            {isCheckingOut ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Place Order'}
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="flex flex-col items-center text-center p-2">
                            <ShieldCheck className="h-6 w-6 text-gray-400 mb-1" />
                            <span className="text-[10px] text-gray-500 font-semibold uppercase">100% Secure</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-2">
                            <Tag className="h-6 w-6 text-gray-400 mb-1" />
                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Easy Returns</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-2">
                            <MapPin className="h-6 w-6 text-gray-400 mb-1" />
                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Original</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;
