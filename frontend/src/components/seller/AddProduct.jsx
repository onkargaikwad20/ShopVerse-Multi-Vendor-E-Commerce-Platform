import React, { useState } from 'react';
import { productService } from '../../api/product.service';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const AddProduct = ({ sellerId, shopId, onProductAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        images: '',
        category: ''
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
            await productService.addProduct(formData, sellerId, shopId);
            if (onProductAdded) onProductAdded();
        } catch (err) {
            console.error(err);
            setError('Failed to add product.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="name">Product Name</label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="price">Price</label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="quantity">Quantity</label>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="0"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="category">Category</label>
                        <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Electronics"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="images">Image URL</label>
                        <Input
                            id="images"
                            name="images"
                            value={formData.images}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div className="flex gap-4">
                        <Button type="button" variant="ghost" className="w-full border" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Add Product
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddProduct;
