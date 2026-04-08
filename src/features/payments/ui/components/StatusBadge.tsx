import React from 'react';
import type { PaymentStatus } from '../../domain/models/Payment';
import { cn } from '@/core/utils';

interface StatusBadgeProps {
    status: PaymentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    // Colores refinados para un look de panel financiero moderno
    const styles: Record<PaymentStatus, string> = {
        // MONEI usa su teal/menta para los éxitos
        SUCCEEDED: "bg-teal-500/10 text-teal-400 border-teal-500/20 shadow-[0_0_10px_rgba(45,212,191,0.1)]",
        FAILED: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        EXPIRED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        CANCELED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        REFUNDED: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        PARTIALLY_REFUNDED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    };

    return (
        <span className={cn(
            "inline-flex items-center justify-center min-w-28 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase border transition-all whitespace-nowrap",
            styles[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"
        )}>
            {/* Punto de color para darle un toque más pro */}
            <span className={cn(
                "w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse shrink-0",
                status === 'SUCCEEDED' ? 'bg-teal-400' :
                    status === 'FAILED' ? 'bg-rose-400' :
                        status === 'EXPIRED' ? 'bg-amber-400' :
                            status === 'CANCELED' ? 'bg-slate-400' :
                                status === 'REFUNDED' ? 'bg-indigo-400' :
                                    status === 'PARTIALLY_REFUNDED' ? 'bg-blue-400' : 'bg-current'
            )}></span>
            <span className="truncate">{status.replace('_', ' ')}</span>
        </span>
    );
};