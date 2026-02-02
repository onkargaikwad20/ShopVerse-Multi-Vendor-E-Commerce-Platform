import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900 antialiased">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export { Layout };
