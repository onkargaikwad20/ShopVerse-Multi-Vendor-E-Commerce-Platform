import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../api/product.service';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loader2, Truck, ShieldCheck, Clock, ArrowRight, Star } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data.slice(0, 8)); // Show only 8 featured products
            } catch {
                setError('Failed to load products. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = [
        { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=800&q=80', link: '/shop?category=electronics' },
        { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80', link: '/shop?category=fashion' },
        { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80', link: '/shop?category=home' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3e6c?auto=format&fit=crop&w=800&q=80', link: '/shop?category=accessories' },
    ];

    const features = [
        { icon: <Truck className="h-6 w-6" />, title: 'Free Shipping', desc: 'On all orders over ₹99' },
        { icon: <ShieldCheck className="h-6 w-6" />, title: 'Secure Payment', desc: '100% secure payment' },
        { icon: <Clock className="h-6 w-6" />, title: '24/7 Support', desc: 'Dedicated support' },
        { icon: <Star className="h-6 w-6" />, title: 'Best Quality', desc: 'Premium products' },
    ];

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-primary-900 text-white shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center sm:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                        Discover the Future <br className="hidden sm:block" /> of <span className="text-secondary-400">Shopping</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-lg text-gray-200 sm:text-xl mb-8">
                        Experience the best in quality and price. Shop our exclusive collection of premium products designed for your lifestyle.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/shop">
                            <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-gray-100 font-bold px-8">
                                Shop Now
                            </Button>
                        </Link>
                        <Link to="/categories">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 px-8">
                                Explore Categories
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Categories Grid */}
            <section>
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
                        <p className="mt-2 text-gray-500">Find exactly what you are looking for</p>
                    </div>
                    <Link to="/categories" className="hidden text-sm font-semibold text-primary-600 hover:text-primary-500 sm:flex items-center gap-1">
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link key={category.name} to={category.link} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] sm:aspect-[3/4] lg:aspect-square shadow-md hover:shadow-xl transition-all">
                            <img src={category.image} alt={category.name} className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold">{category.name}</h3>
                                <span className="text-sm font-medium text-gray-200 group-hover:text-white flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    Shop Now <ArrowRight className="h-3 w-3" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Promo Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-secondary-600 px-6 py-16 text-center shadow-lg sm:px-12 md:py-20 lg:px-16">
                <div className="relative z-10 mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
                        Summer Sale is Live!
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-primary-900/80">
                        Get up to 50% off on selected items. Limited time offer. Don't miss out on these amazing deals.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button className="bg-primary-900 text-white hover:bg-primary-800 border-none">
                            View Offers
                        </Button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 -ml-16 -mt-16 h-48 w-48 rounded-full bg-white/20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 -mr-16 -mb-16 h-48 w-48 rounded-full bg-white/20 blur-3xl"></div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Products</h2>
                    <Link to="/shop" className="text-sm font-semibold text-primary-600 hover:text-primary-500 flex items-center gap-1">
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {error ? (
                    <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">{error}</div>
                ) : products.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
                        No products available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <Card key={product.id} className="group overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 border-none ring-1 ring-gray-100">
                                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={product.images ? product.images.split(',')[0] : 'https://placehold.co/400'}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-primary-700 shadow-sm backdrop-blur-sm">
                                        Best Seller
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
                                        <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem] mb-3">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-extrabold text-primary-700">₹{product.price}</span>
                                        <div className="flex text-yellow-400 text-xs">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="ml-1 text-gray-400 font-medium">(4.8)</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Link to={`/product/${product.id}`} className="w-full">
                                        <Button className="w-full bg-gray-900 text-white hover:bg-primary-600 transition-colors">
                                            View Details
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
