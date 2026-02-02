import React, { useEffect, useState } from 'react';
import { productService } from '../api/product.service';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Loader2, Tag, Timer } from 'lucide-react';

const Offers = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                // Simulate offers by taking first few products or random ones
                setProducts(data.slice(0, 6));
            } catch (error) {
                console.error("Failed to load offers", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header / Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-4 flex justify-center">
                        <Tag className="h-12 w-12 text-white/90" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Exclusive Offers
                    </h1>
                    <p className="mt-4 text-lg text-red-100">
                        Grab the best deals before they are gone! Up to 50% OFF on selected items.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80">
                        <Timer className="h-5 w-5" />
                        <span>Limited Time Only</span>
                    </div>
                </div>
            </div>

            {/* Offers Grid */}
            <section>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Card key={product.id} className="relative overflow-hidden border-2 border-red-100 shadow-sm transition-all hover:shadow-lg hover:border-red-200">
                            {/* Discount Badge */}
                            <div className="absolute left-0 top-0 z-10 rounded-br-xl bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-md">
                                20% OFF
                            </div>

                            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                <img
                                    src={product.images ? product.images.split(',')[0] : 'https://placehold.co/400'}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2">
                                    {product.name}
                                </h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-red-600">
                                        ₹{(product.price * 0.8).toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        ₹{product.price}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                                    {product.description}
                                </p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Link to={`/product/${product.id}`} className="w-full">
                                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                        View Deal
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Offers;
