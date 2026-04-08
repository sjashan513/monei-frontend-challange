import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface RevenueChartProps {
    data: Array<{ label: string; amount: number }>;
}

/**
 * RevenueChart
 * Gráfica de área con los colores corporativos de MONEI.
 * Nota: Necesitarás instalar recharts: npm install recharts
 */
export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    return (
        <div className="h-350px w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 p-6 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Ingresos por periodo</h3>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    <span className="text-xs text-slate-300 font-medium">Volumen (EUR)</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 10 }}
                        dy={10}
                        // Formateador simple para no saturar el eje X
                        tickFormatter={(val) => val.split('-').slice(1).reverse().join('/')}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 10 }}
                        tickFormatter={(val) => `€${val}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0B0F19',
                            border: '1px solid #1E293B',
                            borderRadius: '12px',
                            fontSize: '12px'
                        }}
                        itemStyle={{ color: '#2DD4BF' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#2DD4BF"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};