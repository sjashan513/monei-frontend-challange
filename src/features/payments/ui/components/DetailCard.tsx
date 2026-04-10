import React from 'react';
import { cn } from '@/core/utils';

interface DetailCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const DetailCard: React.FC<DetailCardProps> = ({ title, icon, children, className }) => {
    return (
        <div className={cn("p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm flex flex-col h-full", className)}>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60 text-slate-300 mb-5">
                <div className="p-2 bg-slate-800/50 rounded-lg text-indigo-400 border border-slate-700/50">
                    {icon}
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest">{title}</h3>
            </div>
            <div className="flex-1 space-y-4">
                {children}
            </div>
        </div>
    );
};