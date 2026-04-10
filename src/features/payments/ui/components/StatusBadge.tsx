import React from 'react';
import { PAYMENT_STATUS_MAP, type PaymentStatus } from '../../domain/models/Payment';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface StatusBadgeProps {
    status: PaymentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const { color, style, label } = PAYMENT_STATUS_MAP[status];

    return (
        <span className={cn(
            "inline-flex items-center justify-center min-w-30 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase border transition-all whitespace-nowrap",
            style
        )}>
            <span className={cn(
                "w-1.5 h-1.5 rounded-full mr-1.5 shrink-0",
                color
            )}></span>
            <span>{label}</span>
        </span>
    );
};