import React from 'react';
import PageHeader from '../components/ui/PageHeader';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader title="Privacy Policy" />
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm prose prose-lg max-w-none">
                    <p>Last updated: January 2026</p>

                    <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from ShopVerse.</p>

                    <h2>Personal Information We Collect</h2>
                    <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>

                    <h2>How Do We Use Your Personal Information?</h2>
                    <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices andxv/or order confirmations).</p>

                    <h2>Sharing Your Personal Information</h2>
                    <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Stripe to power our online store.</p>

                    <h2>Data Retention</h2>
                    <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
