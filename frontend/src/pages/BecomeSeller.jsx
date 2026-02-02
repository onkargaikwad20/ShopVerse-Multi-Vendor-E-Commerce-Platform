import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../api/user.service';
import { sellerService } from '../api/seller.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';

const BecomeSeller = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        businessDetails: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await userService.getProfile();
                console.log("Fetched Profile:", profile);

                if (!profile) {
                    console.warn("Profile is null or undefined");
                    return;
                }

                setFormData(prev => ({
                    ...prev,
                    name: profile.name || '',
                    email: profile.email || '',
                    address: profile.address || '',
                }));
            } catch (err) {
                console.error("Failed to fetch profile", err);
                setError("Failed to load your profile. Please fill in the details manually.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await sellerService.createSellerProfile(formData);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Failed to create seller profile. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-green-600">Congratulations!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p>You have successfully registered as a seller.</p>
                        <p className="text-sm text-gray-500">
                            Please log out and log back in to access your Seller Dashboard.
                        </p>
                        <Button onClick={logout} className="w-full">
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return <div className="flex justify-center p-8">Loading...</div>;
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Become a Seller</CardTitle>
                    <p className="text-center text-sm text-gray-500">
                        Confirm your details and start selling on ShopVerse
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">
                                Full Name / Business Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="phone">
                                Phone Number
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+919876543210"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="address">
                                Address
                            </label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="businessDetails">
                                Business Details
                            </label>
                            <textarea
                                id="businessDetails"
                                name="businessDetails"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Tell us about what you sell..."
                                value={formData.businessDetails}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <Button type="submit" className="w-full" isLoading={isSubmitting}>
                            Register as Seller
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default BecomeSeller;
