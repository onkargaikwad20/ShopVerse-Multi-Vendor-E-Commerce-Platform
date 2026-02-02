import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Categories', href: '/shop' },
        { name: 'Offers', href: '/offers' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <ShoppingBag className="h-6 w-6 text-primary-600" />
                        <span className="text-xl font-bold tracking-tight text-gray-900">ShopVerse</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:gap-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-primary-600',
                                location.pathname === link.href ? 'text-primary-600' : 'text-gray-700'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Search & Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block w-64">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search products..."
                                className="pl-9 h-9 bg-gray-50 border-gray-200 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/cart">
                            <Button variant="ghost" size="icon" className="relative text-gray-700">
                                <ShoppingBag className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative group">
                                <Button variant="ghost" size="icon" className="text-gray-700">
                                    <User className="h-5 w-5" />
                                </Button>
                                {/* Simple Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">User ID: {user?.userId}</p>
                                        <p className="text-xs text-gray-500">{user?.role}</p>
                                    </div>
                                    {user?.role === 'USER' && (
                                        <Link
                                            to="/become-seller"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Become a Seller
                                        </Link>
                                    )}
                                    {user?.role === 'SELLER' && (
                                        <Link
                                            to="/seller/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 bg-white cursor-pointer"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="ghost" size="icon" className="text-gray-700">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">Account</span>
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-gray-700"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9 h-10 w-full"
                        />
                    </div>
                    <div className="flex flex-col space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="block text-base font-medium text-gray-700 hover:text-primary-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                        {isAuthenticated ? (
                            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => { logout(); setIsMenuOpen(false); }}>
                                Sign Out
                            </Button>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full">Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export { Navbar };
