import React from 'react';
import { cn } from '@/core/utils';

interface DataRowProps {
    label: string;
    value?: string | number;
    highlight?: boolean;
    mono?: boolean;
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, highlight, mono }) => {
    if (value === undefined || value === null || value === '') return null;

    return (
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {label}
            </p>
            <p className={cn(
                "text-sm font-medium",
                highlight ? "text-white" : "text-slate-300",
                mono ? "font-mono text-xs text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 w-fit" : ""
            )}>
                {value}
            </p>
        </div>
    );
};