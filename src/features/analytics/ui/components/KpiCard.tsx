import React from 'react';
import { cn } from '@/core/utils';

interface KpiCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    description?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    highlight?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, description, trend, highlight }) => {
    return (
        <div className={cn(
            "relative p-6 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
            highlight
                ? "bg-linear-to-br from-indigo-600 to-indigo-900 border border-indigo-500/30 text-white shadow-indigo-900/50"
                : "bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm text-slate-100"
        )}>
            {/* Fondo de icono decorativo grande */}
            <div className="absolute -right-6 -top-6 opacity-5 pointer-events-none transform scale-150">
                {icon}
            </div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <span className={cn(
                    "text-sm font-semibold tracking-wide",
                    highlight ? "text-indigo-200" : "text-slate-400"
                )}>{title}</span>
                <div className={cn(
                    "p-2.5 rounded-xl",
                    highlight ? "bg-indigo-500/30 text-white" : "bg-teal-500/10 text-teal-400"
                )}>
                    {icon}
                </div>
            </div>

            <div className="relative z-10">
                <div className="text-4xl font-black tracking-tight">{value}</div>
                {description && (
                    <p className={cn(
                        "text-xs mt-2 font-medium",
                        highlight ? "text-indigo-200" : "text-slate-500"
                    )}>{description}</p>
                )}
            </div>

            {trend && (
                <div className="mt-4 flex items-center gap-2 relative z-10">
                    <span className={cn(
                        "px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1",
                        trend.isPositive
                            ? "bg-teal-500/20 text-teal-400"
                            : "bg-rose-500/20 text-rose-400"
                    )}>
                        {trend.isPositive ? '↗' : '↘'} {trend.value}
                    </span>
                    <span className={cn(
                        "text-xs font-medium",
                        highlight ? "text-indigo-300" : "text-slate-500"
                    )}>
                        vs last month
                    </span>
                </div>
            )}
        </div>
    );
};