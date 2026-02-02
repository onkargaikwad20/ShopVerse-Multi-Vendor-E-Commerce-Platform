import React from 'react';
import PageHeader from '../components/ui/PageHeader';

const TermsOfService = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader title="Terms of Service" />
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm prose prose-lg max-w-none">
                    <p>Overview</p>
                    <p>This website is operated by ShopVerse. Throughout the site, the terms “we”, “us” and “our” refer to ShopVerse. ShopVerse offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>

                    <h2>SECTION 1 - ONLINE STORE TERMS</h2>
                    <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.</p>

                    <h2>SECTION 2 - GENERAL CONDITIONS</h2>
                    <p>We reserve the right to refuse service to anyone for any reason at any time.</p>

                    <h2>SECTION 3 - PRODUCTS OR SERVICES</h2>
                    <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>

                    <h2>SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h2>
                    <p>Prices for our products are subject to change without notice.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
