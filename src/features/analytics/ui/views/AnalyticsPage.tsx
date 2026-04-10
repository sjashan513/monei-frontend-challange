import React from 'react';
import { useAnalytics } from '../../domain/hooks/useAnalytics';
import { KpiCard } from '../components/KpiCard';
import { RevenueChart } from '../components/RevenueChart';
import { DollarSign, BarChart3, Receipt, Loader2, TrendingUp } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
    const { stats, loading } = useAnalytics();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-teal-500 blur-xl opacity-20 rounded-full"></div>
                    <Loader2 className="w-12 h-12 text-teal-400 animate-spin relative z-10" />
                </div>
                <p className="text-teal-400/80 font-medium tracking-wide animate-pulse">Calculando métricas reales...</p>
            </div>
        );
    }

    const formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: stats.currency,
    });

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Analytics Dashboard</h2>
                    <p className="text-slate-400 mt-1">Métricas calculadas sobre el total de tu operativa.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    <span className="text-sm font-semibold text-teal-400 text-uppercase">Datos en Tiempo Real</span>
                </div>
            </div>

            {/* KPIs Principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KpiCard
                    title="Volumen de Ingresos"
                    value={formatter.format(stats.totalAmount)}
                    icon={<DollarSign className="w-6 h-6" />}
                    trend={{ value: '18.2%', isPositive: true }}
                    highlight={true}
                />
                <KpiCard
                    title="Ticket Medio"
                    value={formatter.format(stats.averageValue)}
                    icon={<BarChart3 className="w-6 h-6" />}
                    trend={{ value: '2.1%', isPositive: false }}
                />
                <KpiCard
                    title="Transacciones Totales"
                    value={stats.transactionCount.toString()}
                    icon={<Receipt className="w-6 h-6" />}
                    description="Operaciones procesadas con éxito"
                />
            </div>

            <RevenueChart data={stats.chartData} />


        </div>
    );
};