import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Calendar, User, CreditCard, Activity,
    MapPin, Store, ShieldCheck, Globe, FileJson,
    Hash, Clock, AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/core/utils';
import { usePaymentDetail } from '../../domain/hooks/usePaymentDetail';
import { StatusBadge } from '../components/StatusBadge';
import { DetailCard } from '../components/DetailCard';
import { DataRow } from '../components/DataRow';


export const PaymentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { payment, loading, error } = usePaymentDetail(id);

    const paymentUrl = (payment?.urls?.callback || payment?.urls?.complete || payment?.urls?.fail);

    const onBack = () => navigate(-1);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-40 space-y-4 px-4">
                <Activity className="w-12 h-12 text-indigo-500 animate-pulse" />
                <p className="text-slate-500 font-black text-xs uppercase tracking-widest animate-pulse text-center">
                    Descifrando la transacción...
                </p>
            </div>
        );
    }

    if (error || !payment) {
        return (
            <div className="text-center py-20 px-6 bg-rose-500/5 border border-rose-500/20 rounded-3xl max-w-xl mx-auto mt-10 m-4">
                <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Transacción no encontrada</h2>
                <button
                    onClick={onBack}
                    className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors w-full sm:w-auto"
                >
                    Volver
                </button>
            </div>
        );
    }

    const formatDate = (date?: Date) => date ? format(date, "dd 'de' MMM, yyyy HH:mm:ss", { locale: es }) : 'N/A';
    const formatCurrency = (amount: number, currency: string) => new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount);

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 w-full overflow-hidden">

            <div className="flex items-center justify-between w-full mb-6 md:mb-8">
                <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Volver</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start w-full">

                {/* Ajuste: Paddings responsivos y text-sizes que no rompan en móvil */}
                <div className="md:col-span-2 lg:col-span-3 relative p-6 sm:p-8 rounded-4xl sm:rounded-[2.5rem] bg-linear-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 w-full">
                    <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 p-8 sm:p-12 opacity-5 pointer-events-none">
                        <ShieldCheck className="w-48 h-48 sm:w-96 sm:h-96 text-indigo-400" />
                    </div>

                    <div className="relative z-10 flex flex-col gap-4 flex-1 w-full">
                        <div className="flex flex-wrap items-center gap-3">
                            <StatusBadge status={payment.status} />
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 shadow-inner">
                                <Hash className="w-3 h-3 text-slate-500 shrink-0" />
                                <span className="text-[10px] font-mono text-slate-300 truncate max-w-30 sm:max-w-none">{payment.id}</span>
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight wrap-break-word">
                            {payment.description || 'Transacción de Pago'}
                        </h2>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                                Creado: <span className="text-slate-300">{formatDate(payment.createdAt)}</span>
                            </div>
                            {payment.updatedAt && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                                    Actualizado: <span className="text-slate-400">{formatDate(payment.updatedAt)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ajuste: Ancho 100% en móvil para el resumen del coste */}
                    <div className="relative z-10 text-left lg:text-right bg-slate-900/50 p-5 sm:p-6 rounded-3xl border border-slate-800/80 backdrop-blur-md shrink-0 w-full lg:w-auto mt-2 lg:mt-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">Importe Procesado</p>
                        <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-2 wrap-break-word">
                            {formatCurrency(payment.amount, payment.currency)}
                        </div>
                        {payment.currency !== 'EUR' && payment.amountEUR && (
                            <p className="text-xs text-slate-400 font-medium">
                                Eqv. {formatCurrency(payment.amountEUR, 'EUR')}
                            </p>
                        )}
                    </div>
                </div>

                <DetailCard title="Cliente Principal" icon={<User className="w-5 h-5" />}>
                    <DataRow label="Nombre Completo" value={payment.customer?.name} highlight />
                    <DataRow label="Correo Electrónico" value={payment.customer?.email} highlight />
                    <DataRow label="Teléfono" value={payment.customer?.phone} />
                </DetailCard>

                <DetailCard title="Comercio Origen" icon={<Store className="w-5 h-5" />}>
                    <DataRow label="Nombre del Comercio" value={payment.shop?.name} highlight />
                    <DataRow label="ID de Cuenta MONEI" value={payment.accountId} mono />
                    <DataRow label="País" value={payment.shop?.country} />
                    <DataRow label="Descriptor Bancario" value={payment.descriptor} mono />
                </DetailCard>

                <DetailCard title="Instrumento de Pago" icon={<CreditCard className="w-5 h-5" />}>
                    <DataRow label="Método" value={payment.paymentMethod?.method?.toUpperCase()} highlight />

                    {payment.paymentMethod?.card && (
                        <>
                            <DataRow label="Marca" value={payment.paymentMethod.card.brand?.toUpperCase()} highlight />
                            <DataRow label="Tarjeta" value={`•••• •••• •••• ${payment.paymentMethod.card.last4}`} mono />
                            <DataRow label="Titular" value={payment.paymentMethod.card.cardholderName} />
                        </>
                    )}
                    {payment.paymentMethod?.bizum && (
                        <DataRow label="Teléfono Bizum" value={payment.paymentMethod.bizum.phoneNumber} mono />
                    )}
                    {payment.paymentMethod?.paypal && (
                        <DataRow label="Cuenta PayPal" value={payment.paymentMethod.paypal.email} mono />
                    )}
                </DetailCard>

                <DetailCard title="Auditoría y Riesgo" icon={<ShieldCheck className="w-5 h-5" />}>
                    <DataRow label="Código de Autorización" value={payment.authorizationCode} mono />
                    <DataRow label="Status Code (API)" value={payment.statusCode} mono />
                    <DataRow label="Mensaje del Procesador" value={payment.statusMessage} />
                    {payment.fraudDetectorScore !== undefined && (
                        <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Score de Fraude</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all",
                                            payment.fraudDetectorScore < 30 ? "bg-teal-400" : payment.fraudDetectorScore < 70 ? "bg-amber-400" : "bg-rose-500"
                                        )}
                                        style={{ width: `${Math.min(payment.fraudDetectorScore, 100)}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-white">{payment.fraudDetectorScore}/100</span>
                            </div>
                        </div>
                    )}
                </DetailCard>

                {(payment.billingDetails || payment.shippingDetails) ? (
                    <>
                        {payment.billingDetails && (
                            <DetailCard title="Facturación" icon={<MapPin className="w-5 h-5" />}>
                                <DataRow label="Razón Social / Nombre" value={payment.billingDetails.name} highlight />
                                <DataRow label="Email" value={payment.billingDetails.email} />
                                {payment.billingDetails.address && (
                                    <div className="mt-2 p-3 bg-slate-900/50 rounded-xl text-xs text-slate-300 font-medium leading-relaxed border border-slate-800/50">
                                        {payment.billingDetails.address.line1}<br />
                                        {payment.billingDetails.address.city}, {payment.billingDetails.address.zip}<br />
                                        {payment.billingDetails.address.country}
                                    </div>
                                )}
                            </DetailCard>
                        )}
                        {payment.shippingDetails && (
                            <DetailCard title="Envío" icon={<MapPin className="w-5 h-5" />}>
                                <DataRow label="Destinatario" value={payment.shippingDetails.name} highlight />
                                {payment.shippingDetails.address && (
                                    <div className="mt-2 p-3 bg-slate-900/50 rounded-xl text-xs text-slate-300 font-medium leading-relaxed border border-slate-800/50">
                                        {payment.shippingDetails.address.line1}<br />
                                        {payment.shippingDetails.address.city}, {payment.shippingDetails.address.country}
                                    </div>
                                )}
                            </DetailCard>
                        )}
                    </>
                ) : (
                    <DetailCard title="Direcciones" icon={<MapPin className="w-5 h-5" />} className="justify-center items-center text-center opacity-60">
                        <p className="text-slate-500 text-xs italic">No hay información de direcciones.</p>
                    </DetailCard>
                )}

                <div className="md:col-span-2 lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60 text-slate-300 mb-5">
                        <FileJson className="w-5 h-5 text-indigo-400 shrink-0" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Metadata Técnica</h3>
                    </div>
                    {Object.keys(payment.metadata || {}).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(payment.metadata).map(([key, value]) => (
                                <div key={key} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 overflow-hidden">
                                    <p className="text-[10px] font-mono text-indigo-400 mb-1 truncate">{key.toLocaleUpperCase()}</p>
                                    <p className="text-sm text-slate-200 font-medium wrap-break-word overflow-wrap-anywhere">{String(value)}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 italic">Sin metadatos adicionales.</p>
                    )}
                </div>

                <div className="md:col-span-2 lg:col-span-1 p-5 sm:p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60 text-slate-300 mb-5">
                        <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
                        <h3 className="text-xs font-black uppercase tracking-widest">URLs de Integración</h3>
                    </div>
                    {!paymentUrl ? (
                        <p className="text-sm text-slate-500 italic">No hay URLs configuradas para esta transacción.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <DataRow label="Webhook URL" value={payment.urls?.callback} mono />
                            <DataRow label="Success Redirect" value={payment.urls?.complete} mono />
                            <DataRow label="Error Redirect" value={payment.urls?.fail} mono />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};