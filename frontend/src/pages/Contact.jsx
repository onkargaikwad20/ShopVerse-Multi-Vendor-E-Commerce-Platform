import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';

const Contact = () => {
    return (
        <div className="bg-white">
            <PageHeader
                title="Contact Us"
                description="We'd love to hear from you. Please fill out the form below or reach out via email."
            />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 bg-primary-100 p-3 rounded-lg">
                                <Mail className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                <p className="mt-1 text-gray-500">Our friendly team is here to help.</p>
                                <p className="mt-2 font-semibold text-primary-600">support@shopverse.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 bg-primary-100 p-3 rounded-lg">
                                <MapPin className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Office</h3>
                                <p className="mt-1 text-gray-500">Come say hello at our office HQ.</p>
                                <p className="mt-2 font-semibold text-gray-900">
                                    Panchavati Society<br />
                                    Pune , Maharashtra , India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 bg-primary-100 p-3 rounded-lg">
                                <Phone className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                <p className="mt-1 text-gray-500">Mon-Fri from 8am to 5pm.</p>
                                <p className="mt-2 font-semibold text-primary-600">+91 9325653951</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
