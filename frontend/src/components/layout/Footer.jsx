import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <ShoppingBag className="h-6 w-6 text-primary-600" />
                            <span className="text-xl font-bold text-gray-900">ShopVerse</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            The best place to find everything you need. Quality products, fast delivery, and excellent support.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link to="/shop" className="text-sm text-gray-600 hover:text-primary-600">All Products</Link></li>
                            <li><Link to="/shop?category=featured" className="text-sm text-gray-600 hover:text-primary-600">Featured</Link></li>
                            <li><Link to="/shop?sort=newest" className="text-sm text-gray-600 hover:text-primary-600">New Arrivals</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link to="/contact" className="text-sm text-gray-600 hover:text-primary-600">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-sm text-gray-600 hover:text-primary-600">FAQs</Link></li>
                            <li><Link to="/shipping-policy" className="text-sm text-gray-600 hover:text-primary-600">Shipping Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-primary-600">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="text-sm text-gray-600 hover:text-primary-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
