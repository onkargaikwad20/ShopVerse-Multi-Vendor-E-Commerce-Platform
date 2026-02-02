import React from 'react';

const PageHeader = ({ title, description }) => {
    return (
        <div className="bg-gray-900 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
