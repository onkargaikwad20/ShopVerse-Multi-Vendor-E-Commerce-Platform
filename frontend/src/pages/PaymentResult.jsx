import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const PaymentResult = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const isSuccess = window.location.pathname.includes('/success');

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            {isSuccess ? (
                <>
                    <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600 mb-8 max-w-md">
                        Thank you for your purchase. Your order has been placed successfully and is being processed.
                        <br />
                        <span className="text-sm text-gray-500 mt-2 block">
                            You will receive an order confirmation email shortly.
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <Link to="/shop">
                            <Button variant="outline">Continue Shopping</Button>
                        </Link>
                        
                    </div>
                </>
            ) : (
                <>
                    <XCircle className="h-24 w-24 text-red-500 mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                    <p className="text-gray-600 mb-8 max-w-md">
                        Your payment was cancelled. No charges were made. You can try again or continue shopping.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/shop">
                            <Button variant="outline">Continue Shopping</Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentResult;
