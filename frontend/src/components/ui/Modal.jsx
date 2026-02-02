import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

const Modal = ({ isOpen, onClose, title, children, className }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                ref={modalRef}
                className={cn(
                    'relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl animate-in zoom-in-95 duration-200',
                    className
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export { Modal };
