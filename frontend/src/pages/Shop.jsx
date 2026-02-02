import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productService } from '../api/product.service';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loader2, Filter, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category'); // Read ?category=...

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'electronics', name: 'Electronics' },
        { id: 'fashion', name: 'Fashion' },
        { id: 'home', name: 'Home & Living' },
        { id: 'accessories', name: 'Accessories' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
                // Initial filter will happen in the effect below
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter logic
    useEffect(() => {
        if (!currentCategory || currentCategory === 'all') {
            setFilteredProducts(products);
        } else {
            const lowerCat = currentCategory.toLowerCase();
            const filtered = products.filter(p =>
                (p.category && p.category.toLowerCase() === lowerCat) ||
                (p.description && p.description.toLowerCase().includes(lowerCat)) ||
                (p.name && p.name.toLowerCase().includes(lowerCat))
            );
            setFilteredProducts(filtered);
        }
    }, [currentCategory, products]);

    const handleCategoryChange = (categoryId) => {
        if (categoryId === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', categoryId);
        }
        setSearchParams(searchParams);
        setIsMobileFiltersOpen(false);
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
                <Button variant="outline" onClick={() => setIsMobileFiltersOpen(true)} className="w-full flex items-center justify-center gap-2">
                    <Filter className="h-4 w-4" /> Filters
                </Button>
            </div>

            {/* Sidebar Filters */}
            <aside className={cn(
                "fixed inset-0 z-50 bg-white p-6 shadow-xl transition-transform duration-300 lg:static lg:z-0 lg:block lg:w-64 lg:p-0 lg:shadow-none lg:bg-transparent",
                isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="flex items-center justify-between mb-6 lg:hidden">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Categories</h3>
                        <div className="space-y-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={cn(
                                        "block w-full text-left text-sm transition-colors",
                                        (currentCategory === cat.id) || (!currentCategory && cat.id === 'all')
                                            ? "font-bold text-primary-600"
                                            : "text-gray-600 hover:text-gray-900"
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileFiltersOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsMobileFiltersOpen(false)}
                />
            )}

            {/* Product Grid */}
            <main className="flex-1">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {currentCategory
                            ? categories.find(c => c.id === currentCategory)?.name || 'Products'
                            : 'All Products'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Showing {filteredProducts.length} results
                    </p>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                        <p className="text-lg text-gray-500">No products found for this category.</p>
                        <Button
                            variant="link"
                            onClick={() => handleCategoryChange('all')}
                            className="mt-2 text-primary-600"
                        >
                            View all products
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <Card key={product.id} className="group overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={product.images ? product.images.split(',')[0] : 'https://placehold.co/400'}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                        <Link to={`/product/${product.id}`} className="hover:underline">
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Link to={`/product/${product.id}`} className="w-full">
                                        <Button variant="secondary" className="w-full border border-gray-200 hover:bg-gray-50">
                                            View Details
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Shop;
