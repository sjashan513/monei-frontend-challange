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

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-87.5 w-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl flex items-center justify-center">
                <p className="text-slate-500 font-medium">No hay datos suficientes para graficar.</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-80 bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 p-6 rounded-3xl shadow-2xl">

            {/* Cabecera del gráfico */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Evolución de Ingresos</h3>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                    <span className="text-xs text-slate-300 font-medium">Volumen (EUR)</span>
                </div>
            </div>

            <div className="h-75 min-h-75 w-full relative">

                <ResponsiveContainer width="99%" height="100%">

                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" opacity={0.5} />
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 11 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 11 }}
                            dx={-10}
                            tickFormatter={(val) => val >= 1000 ? `€${(val / 1000).toFixed(0)}k` : `€${val}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0B0F19',
                                border: '1px solid #1E293B',
                                borderRadius: '12px',
                                fontSize: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#2DD4BF', fontWeight: 'bold' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#2DD4BF"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorAmount)"
                            isAnimationActive={true}
                            animationDuration={1500}
                        />
                    </AreaChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
};