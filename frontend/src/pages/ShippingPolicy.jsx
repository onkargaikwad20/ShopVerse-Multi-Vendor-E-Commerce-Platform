import React from 'react';
import PageHeader from '../components/ui/PageHeader';

const ShippingPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader title="Shipping Policy" />
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm prose prose-lg max-w-none">
                    <p className="lead">Here at ShopVerse, we strive to deliver your products as quickly and safely as possible.</p>

                    <h2>Shipping Rates & Delivery Estimates</h2>
                    <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                    <ul>
                        <li><strong>Standard Shipping:</strong> 3-5 business days - Calculated at checkout</li>
                        <li><strong>Express Shipping:</strong> 1-2 business days - Calculated at checkout</li>
                    </ul>

                    <h2>Shipment Processing Time</h2>
                    <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>

                    <h2>International Shipping</h2>
                    <p>We currently ship to select countries worldwide. Shipping times vary depending on location and customs processing.</p>

                    <h2>Customs, Duties and Taxes</h2>
                    <p>ShopVerse is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
