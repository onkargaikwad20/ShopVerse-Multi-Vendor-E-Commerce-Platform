import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../api/user.service';
import { Button } from '../components/ui/Button';
import { Loader2, ShoppingBag } from 'lucide-react';

const COUNTRY_CODES = [
    { code: '+91', country: 'IN' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
];

const Register = () => {
    const navigate = useNavigate();
    const { register, verifyOtp } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        otp: '',
        address: ''
    });
    const [countryCode, setCountryCode] = useState('+91');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Phone validation
        if (!/^\d{10}$/.test(formData.phone)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await register(`${countryCode}${formData.phone}`, formData.password);
            setStep(2);
        } catch (error) {
            if (error.response?.status === 409) {
                setError('User already exists. Please sign in instead.');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await verifyOtp(`${countryCode}${formData.phone}`, formData.otp);

            if (data.token) {
                console.log("Attempting to update profile with:", {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address
                });
                await userService.updateProfile({
                    name: formData.name,
                    email: formData.email,
                    address: formData.address
                }, data.token);
                console.log("Profile update successful");
            }

            navigate('/login');
        } catch (err) {
            console.error(err);
            setError('Invalid OTP or failed to create profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=2070&auto=format&fit=crop"
                    alt="Shopping Friends"
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <div className="mb-6 flex items-center gap-3">
                        <ShoppingBag className="h-10 w-10 text-primary-400" />
                        <h1 className="text-4xl font-extrabold tracking-tight">Join ShopVerse</h1>
                    </div>
                    <p className="text-xl font-medium text-gray-200 text-shadow-sm max-w-md">
                        Create an account today and unlock exclusive deals, personalized recommendations, and faster checkout.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 xl:px-24">
                <div className="mx-auto w-full max-w-md">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            {step === 1 ? 'Create your account' : 'Verify your phone'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {step === 1 ? 'Start your shopping journey in seconds' : `We sent a code to ${countryCode}${formData.phone}`}
                        </p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <select
                                        className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm focus:ring-1 focus:ring-primary-500 hover:bg-gray-100"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        disabled={isLoading}
                                    >
                                        {COUNTRY_CODES.map((country) => (
                                            <option key={country.code} value={country.code}>{country.code}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={10}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <textarea
                                    name="address"
                                    rows={2}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full flex justify-center py-2.5" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">One-Time Password</label>
                                <input
                                    type="text"
                                    name="otp"
                                    required
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-center text-2xl tracking-widest py-3 border"
                                    placeholder="000000"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    maxLength={6}
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full flex justify-center py-2.5" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verify & Continue'}
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm text-gray-500 hover:text-gray-900"
                                >
                                    Change Phone Number
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 1 && (
                        <div className="mt-8 text-center text-sm">
                            <span className="text-gray-500">Already have an account? </span>
                            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500">
                                Sign in instead
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
