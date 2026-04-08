import React from 'react';
import { usePaymentsList } from '../../domain/hooks/usePaymentsList';
import { PaymentTable } from '../components/PaymentTable';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/core/ui/button';

/**
 * PaymentListPage
 * Vista principal de la feature de pagos.
 * Implementa el patrón de visualización de datos con estados de carga.
 */
export const PaymentListPage: React.FC = () => {
    const { payments, loading, error, loadMore, isFetchingMore } = usePaymentsList(15);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-3">
                <AlertCircle className="w-8 h-8 text-rose-500" />
                <h3 className="text-rose-500 font-bold">Error al cargar los pagos</h3>
                <p className="text-rose-400 text-sm max-w-md">{error.message}</p>
                <Button variant="destructive" onClick={() => window.location.reload()}>
                    Reintentar
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Transacciones Recientes</h2>
                    <p className="text-sm text-slate-500">Gestión de cobros y estados de pago.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-300">{payments.length} resultados</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-slate-400 animate-pulse font-medium">Conectando con MONEI...</p>
                </div>
            ) : (
                <>
                    <PaymentTable payments={payments} />

                    <div className="flex justify-center pt-6 pb-12">
                        <Button
                            onClick={loadMore}
                            disabled={isFetchingMore}
                            variant="outline"
                            size="lg"
                            className="px-10 border-slate-700 hover:bg-slate-800 text-slate-200"
                        >
                            {isFetchingMore ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Cargando más...
                                </>
                            ) : (
                                'Cargar más transacciones'
                            )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};