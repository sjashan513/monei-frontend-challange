import React from 'react';
import type { Payment } from '../../domain/models/Payment';
import { StatusBadge } from './StatusBadge';
import { format } from 'date-fns';

interface PaymentTableProps {
    payments: Payment[];
}

/**
 * PaymentTable
 * Representación tabular de los pagos. 
 * Consume entidades de dominio directamente.
 */
export const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
    return (
        <div className="rounded-md border border-slate-800 bg-slate-900/50 overflow-hidden">
            <table className="w-full text-sm text-slate-200">
                <thead className="bg-slate-900 text-slate-400 font-medium border-b border-slate-800">
                    <tr>
                        <th className="px-4 py-3 text-left">Fecha</th>
                        <th className="px-4 py-3 text-left">Descripción</th>
                        <th className="px-4 py-3 text-left">Importe</th>
                        <th className="px-4 py-3 text-center">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-4">
                                {format(payment.createdAt, 'dd MMM, HH:mm')}
                            </td>
                            <td className="px-4 py-4">
                                <div className="font-medium text-slate-100">{payment.description}</div>
                                <div className="text-xs text-slate-500">{payment.id}</div>
                            </td>
                            <td className="px-4 py-4 font-mono">
                                {new Intl.NumberFormat('es-ES', {
                                    style: 'currency',
                                    currency: payment.currency,
                                }).format(payment.amount)}
                            </td>
                            <td className="px-4 py-4 text-center">
                                <StatusBadge status={payment.status} />
                            </td>
                        </tr>
                    ))}
                    {payments.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                                No se han encontrado pagos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};