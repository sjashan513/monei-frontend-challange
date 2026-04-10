import React from 'react';
import { usePaymentsList } from '../../domain/hooks/usePaymentsList';
import { PaymentTable } from '../components/PaymentTable';
import { PaymentFilters } from '../components/PaymentFilters';
import { Loader2, AlertCircle, CreditCard, ArrowRight } from 'lucide-react';

export const PaymentListPage: React.FC = () => {
    const { payments, loading, error, loadMore, isFetchingMore, hasMore, totalRecords } = usePaymentsList(15);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-rose-500/5 border border-rose-500/20 rounded-4xl space-y-4">
                <AlertCircle className="w-12 h-12 text-rose-500" />
                <h3 className="text-xl font-bold text-white">Error de conexión</h3>
                <p className="text-slate-400 text-sm max-w-md">No hemos podido sincronizar los datos con el servidor.</p>
                <button className="bg-rose-600 text-white px-6 py-2 rounded-xl font-bold" onClick={() => window.location.reload()}>
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header y Filtros */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-indigo-500/10 rounded-lg">
                            <CreditCard className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80">Operaciones</span>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight leading-none">Transacciones</h2>
                    <p className="text-slate-500 mt-2 text-sm font-medium">
                        Mostrando <strong className="text-white">{totalRecords}</strong> resultados
                    </p>
                </div>

                <PaymentFilters />
            </div>

            {/* Contenido principal */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
                        <Loader2 className="w-14 h-14 text-indigo-400 animate-spin relative z-10" />
                    </div>
                    <p className="text-slate-500 font-bold tracking-widest text-xs uppercase animate-pulse">Filtrando...</p>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
                    <PaymentTable payments={payments} />

                    {hasMore && (
                        <div className="flex justify-center pt-10 pb-20">
                            <button
                                onClick={loadMore}
                                disabled={isFetchingMore}
                                className="group relative overflow-hidden border border-slate-800 hover:border-indigo-500/50 bg-slate-900/50 text-white rounded-xl transition-all px-12 py-3 font-semibold disabled:opacity-50"
                            >
                                <div className="absolute inset-0 bg-indigo-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                {isFetchingMore ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                                        <span>Cargando...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 relative z-10">
                                        <span>Cargar más transacciones</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-indigo-400" />
                                    </div>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};