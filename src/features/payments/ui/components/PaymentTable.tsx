import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Payment } from '../../domain/models/Payment';
import { StatusBadge } from './StatusBadge';
import { format } from 'date-fns';
import { ChevronRight, CreditCard } from 'lucide-react';
import { es } from 'date-fns/locale';

interface PaymentTableProps {
    payments: Payment[];
}

export const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
    const navigate = useNavigate();

    return (
        <div className="rounded-3xl md:rounded-2xl border border-slate-800/60 bg-slate-900/30 backdrop-blur-sm shadow-2xl relative w-full overflow-hidden">

            {/* =========================================
                VISTA DESKTOP (Tabla Estándar)
            ========================================= */}
            <div className="hidden md:block w-full overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-175 text-sm text-slate-300">
                    <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800/60">
                        <tr>
                            <th className="px-6 py-4 text-left tracking-wider uppercase text-[10px]">Fecha</th>
                            <th className="px-6 py-4 text-left tracking-wider uppercase text-[10px]">Transacción</th>
                            <th className="px-6 py-4 text-left tracking-wider uppercase text-[10px]">Importe</th>
                            <th className="px-6 py-4 text-center tracking-wider uppercase text-[10px]">Estado</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                        {payments.map((payment) => (
                            <tr
                                key={payment.id}
                                onClick={() => navigate(`/payments/${payment.id}`)}
                                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                            >
                                <td className="px-6 py-5 text-slate-400 font-medium whitespace-nowrap">
                                    {format(payment.createdAt, 'dd MMM yyyy, HH:mm', { locale: es })}
                                </td>
                                <td className="px-6 py-5 min-w-50">
                                    <div className="font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                                        {payment.description}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-mono mt-1 truncate max-w-62.5">{payment.id}</div>
                                </td>
                                <td className="px-6 py-5 font-black text-white text-base tracking-tight whitespace-nowrap">
                                    {new Intl.NumberFormat('es-ES', {
                                        style: 'currency',
                                        currency: payment.currency,
                                    }).format(payment.amount)}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <StatusBadge status={payment.status} />
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors inline-block group-hover:translate-x-1" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* =========================================
                VISTA MÓVIL (Tarjetas Apiladas)
            ========================================= */}
            <div className="block md:hidden divide-y divide-slate-800/40">
                {payments.map((payment) => (
                    <div
                        key={`mobile-${payment.id}`}
                        onClick={() => navigate(`/payments/${payment.id}`)}
                        className="p-5 hover:bg-slate-800/40 active:bg-slate-800/60 transition-colors cursor-pointer flex flex-col gap-4"
                    >
                        {/* Fila Superior: Fecha y Estado */}
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                {format(payment.createdAt, 'dd MMM yy, HH:mm', { locale: es })}
                            </span>
                            <StatusBadge status={payment.status} />
                        </div>

                        {/* Fila Media: Transacción y Monto */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-sm md:text-base leading-tight truncate">
                                    {payment.description}
                                </h4>
                                <div className="text-[10px] text-slate-500 font-mono mt-1.5 flex items-center gap-1.5 truncate">
                                    <CreditCard className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{payment.id}</span>
                                </div>
                            </div>
                            <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                <span className="font-black text-white text-lg tracking-tight">
                                    {new Intl.NumberFormat('es-ES', {
                                        style: 'currency',
                                        currency: payment.currency,
                                        maximumFractionDigits: 0 // Simplifica visualmente en móvil
                                    }).format(payment.amount)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Estado Vacío Universal */}
            {payments.length === 0 && (
                <div className="p-12 md:p-16 text-center flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-2">
                        <CreditCard className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-slate-300 font-bold text-lg">No hay transacciones</p>
                    <p className="text-slate-500 text-sm max-w-62.5">Prueba a cambiar los filtros o el rango de fechas para ver resultados.</p>
                </div>
            )}
        </div>
    );
};