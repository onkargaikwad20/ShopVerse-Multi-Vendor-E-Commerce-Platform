import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Loader2, ShoppingBag } from 'lucide-react';

const COUNTRY_CODES = [
    { code: '+91', country: 'IN' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
];

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const from = location.state?.from || '/';

    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [countryCode, setCountryCode] = useState('+91');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await login(`${countryCode}${formData.phone}`, formData.password);
            if (data.role === 'SELLER') {
                navigate('/seller/dashboard', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch {
            setError('Invalid phone number or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Model"
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <div className="mb-6 flex items-center gap-3">
                        <ShoppingBag className="h-10 w-10 text-primary-400" />
                        <h1 className="text-4xl font-extrabold tracking-tight">ShopVerse</h1>
                    </div>
                    <p className="text-xl font-medium text-gray-200 text-shadow-sm max-w-md">
                        Discover the latest trends in fashion and shop your favorite brands with ease.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please enter your details to sign in
                        </p>
                    </div>

                    <div className="mt-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="mt-2 flex rounded-md shadow-sm">
                                    <select
                                        className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm focus:ring-1 focus:ring-primary-500 hover:bg-gray-100"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        disabled={isLoading}
                                    >
                                        {COUNTRY_CODES.map((country) => (
                                            <option key={country.code} value={country.code}>
                                                {country.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        autoComplete="tel"
                                        required
                                        maxLength={10}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100 flex items-center gap-2">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full flex justify-center py-2.5" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign In'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-gray-500">Don't have an account? </span>
                            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
