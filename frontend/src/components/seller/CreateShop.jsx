import React, { useState } from 'react';
import { sellerService } from '../../api/seller.service';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const CreateShop = ({ onShopCreated }) => {
    const [formData, setFormData] = useState({
        shopName: '',
        description: '',
        address: '',
        shopBannerUrl: '',
        categories: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                categories: formData.categories.split(',').map(c => c.trim()).filter(Boolean)
            };
            await sellerService.createShop(payload);
            if (onShopCreated) onShopCreated();
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to create shop. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Create Your Shop</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="shopName">Shop Name</label>
                        <Input
                            id="shopName"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="description">Description</label>
                        <Input
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="address">Address</label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="shopBannerUrl">Banner URL (Optional)</label>
                        <Input
                            id="shopBannerUrl"
                            name="shopBannerUrl"
                            value={formData.shopBannerUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/banner.jpg"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="categories">Categories (comma separated)</label>
                        <Input
                            id="categories"
                            name="categories"
                            value={formData.categories}
                            onChange={handleChange}
                            placeholder="Electronics, Clothing, Home"
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        Create Shop
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateShop;
