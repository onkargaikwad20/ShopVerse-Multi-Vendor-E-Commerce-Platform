import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../api/product.service';
import { orderService } from '../api/order.service';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Loader2, Minus, Plus, ShoppingCart, CreditCard, ShieldCheck, Truck, RotateCcw, Star, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isOrdering, setIsOrdering] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState(null);
    const [currImageIndex, setCurrImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
                if (data.images && data.images.includes(',')) {
                }
            } catch {
                setError('Failed to load product details.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.quantity || 99)));
    };

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/product/${id}` } });
            return;
        }

        setIsOrdering(true);
        try {
            const orderData = {
                userId: user.userId,
                productId: product.id,
                productName: product.name,
                quantity: quantity,
                totalAmount: product.price * quantity,
                items: [{
                    productId: product.id,
                    productName: product.name,
                    quantity: quantity,
                    price: product.price
                }]
            };

            const response = await orderService.createOrder(orderData);
            if (response.checkoutUrl) {
                window.location.href = response.checkoutUrl;
            }
        } catch (error) {
            console.error("Order failed", error);
            alert("Failed to initiate checkout");
        } finally {
            setIsOrdering(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/product/${id}` } });
            return;
        }
        setIsAddingToCart(true);
        try {
            const cartItem = {
                productId: product.id,
                productName: product.name,
                quantity: quantity,
                price: product.price,
                imageUrl: product.images ? product.images.split(',')[0] : null
            };

            await addToCart(cartItem);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        } catch (error) {
            console.error("Failed to add to cart", error);
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary-600" /></div>;
    }

    if (!product) {
        return <div className="text-center py-20 text-xl font-semibold">Product not found</div>;
    }

    const images = product.images ? product.images.split(',') : ['https://placehold.co/600x800'];

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                    {/* Left Column: Image Gallery */}
                    <div className="p-8 lg:p-12 bg-gray-50 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-200">
                        <div className="relative w-full aspect-square max-w-lg mx-auto mb-8 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200">
                            <img
                                src={images[currImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-contain p-4"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 max-w-full">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrImageIndex(idx)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden bg-white ${currImageIndex === idx ? 'border-primary-600 ring-2 ring-primary-100' : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="p-8 lg:p-12 flex flex-col">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                                    {product.category || 'New Arrival'}
                                </span>
                                <div className="flex items-center text-yellow-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-gray-600 text-sm ml-1 font-medium">4.8 (120 reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="text-4xl font-bold text-primary-600">
                                ₹{product.price}
                            </p>
                        </div>

                        <div className="prose prose-sm text-gray-500 mb-8 border-t border-b border-gray-100 py-6">
                            <p>{product.description}</p>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="space-y-6 mb-8">
                            {product.quantity > 0 ? (
                                <>
                                    <div className="flex items-center gap-6">
                                        <span className="text-sm font-medium text-gray-700">Quantity</span>
                                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                                            <button
                                                onClick={() => handleQuantityChange(-1)}
                                                className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                                                disabled={quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(1)}
                                                className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                                                disabled={quantity >= product.quantity}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {product.quantity < 5 && (
                                            <span className="text-red-600 font-medium text-sm animate-pulse">
                                                Only {product.quantity} left!
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            size="lg"
                                            className="flex-1"
                                            onClick={handleBuyNow}
                                            isLoading={isOrdering}
                                        >
                                            Buy Now
                                        </Button>
                                        <Button
                                            size="lg"
                                            className={`flex-1 ${isAdded ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
                                            variant={isAdded ? "default" : "secondary"}
                                            onClick={handleAddToCart}
                                            isLoading={isAddingToCart}
                                            disabled={isAdded}
                                        >
                                            {isAdded ? (
                                                <>
                                                    <Check className="mr-2 h-5 w-5" />
                                                    Added!
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                                    <span className="text-red-600 font-bold text-lg">Out of Stock</span>
                                    <p className="text-sm text-red-500">This item is currently unavailable.</p>
                                </div>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 mt-auto">
                            <div className="flex items-start gap-3">
                                <Truck className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">On all orders over ₹50</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <RotateCcw className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Easy Returns</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">30-day money back guarantee</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Secure Payment</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">100% secure checkout</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CreditCard className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Best Price</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">Guaranteed low prices</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
