import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm transition-all hover:shadow-md">
            <button
                className="flex w-full items-center justify-between text-left text-lg font-medium text-gray-900 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </button>
            {isOpen && (
                <div className="mt-3 text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {answer}
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in their original packaging. Please visit our Returns page to initiate a return."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days. Express shipping is available and typically takes 1-2 business days."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order has shipped, you will receive an email with a tracking number and a link to track your package."
        },
        {
            question: "Is my payment information secure?",
            answer: "Absolutely. We use Stripe for payment processing, which is a certified PCI Service Provider Level 1. We do not store your card details."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title="Frequently Asked Questions"
                description="Find answers to common questions about our products, shipping, and returns."
            />
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
