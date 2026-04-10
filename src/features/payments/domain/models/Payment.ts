/**
 * Payment Status Type
 * Definimos los estados posibles según el negocio de MONEI.
 */
export type PaymentStatus =
    | 'SUCCEEDED'
    | 'PENDING'
    | 'PENDING_PROCESSING'
    | 'FAILED'
    | 'CANCELED'
    | 'REFUNDED'
    | 'PARTIALLY_REFUNDED'
    | 'AUTHORIZED'
    | 'EXPIRED'
    | 'PAID_OUT';



/**
* PAYMENT_STATUS_MAP
* Fuente de verdad para etiquetas y estilos visuales.
* Ubicado en el dominio para ser reutilizado en toda la aplicación.
*/
export const PAYMENT_STATUS_MAP: Record<PaymentStatus, { id: PaymentStatus; label: string; color: string, style: string }> = {
    SUCCEEDED: { id: 'SUCCEEDED', label: 'Completado', color: 'bg-teal-400', style: "bg-teal-500/10 text-teal-400 border-teal-500/20 shadow-[0_0_10px_rgba(45,212,191,0.1)]" },
    PENDING: { id: 'PENDING', label: 'Pendiente', color: 'bg-amber-400', style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    PENDING_PROCESSING: { id: 'PENDING_PROCESSING', label: 'Procesando', color: 'bg-amber-500', style: "bg-amber-500/10 text-amber-400 border-amber-500/20 italic" },
    FAILED: { id: 'FAILED', label: 'Fallido', color: 'bg-rose-400', style: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
    CANCELED: { id: 'CANCELED', label: 'Cancelado', color: 'bg-slate-400', style: "bg-slate-700/10 text-slate-500 border-slate-700/20" },
    REFUNDED: { id: 'REFUNDED', label: 'Reembolsado', color: 'bg-indigo-400', style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    PARTIALLY_REFUNDED: { id: 'PARTIALLY_REFUNDED', label: 'Reembolso Parcial', color: 'bg-blue-400', style: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    AUTHORIZED: { id: 'AUTHORIZED', label: 'Autorizado', color: 'bg-violet-400', style: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    EXPIRED: { id: 'EXPIRED', label: 'Expirado', color: 'bg-slate-500', style: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
    PAID_OUT: { id: 'PAID_OUT', label: 'Pagado', color: 'bg-emerald-400', style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
};


/**
 * Payment Domain Entity
 * * Este es nuestro modelo "limpio". No contiene metadatos de GraphQL (__typename)
 * y transforma tipos técnicos (Unix Timestamp) en tipos de dominio (Date).
 */
export interface Payment {
    id: string;
    amount: number;
    currency: string;
    description: string;
    status: PaymentStatus;
    createdAt: Date;
    referenceId?: string;
    customerEmail?: string;
}

/**
 * Analytics Summary Entity
 * Para el dashboard de KPIs.
 */
export interface PaymentAnalytics {
    totalAmount: number;
    count: number;
    averageAmount: number;
    currency: string;
}

/**
 * PaymentDTO (Data Transfer Object)
 * Representa la estructura cruda que recibimos de la API de GraphQL.
 * La exportamos para que la capa de Data Access y los Hooks puedan tipar las respuestas.
 */
export interface PaymentDTO {
    id: string;
    amount: number;
    currency?: string;
    description?: string;
    status?: string;
    createdAt: number; // Unix Timestamp (segundos)
    referenceId?: string;
    customer?: {
        email?: string;
    };
}


export interface Address {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    zip?: string;
    state?: string;
}

export interface ContactDetails {
    name?: string;
    email?: string;
    phone?: string;
    address?: Address;
}

export interface PaymentMethodDetails {
    method?: string;
    card?: {
        brand?: string;
        last4?: string;
        cardholderName?: string;
        expiration?: number;
    };
    bizum?: {
        phoneNumber?: string;
    };
    paypal?: {
        email?: string;
    };
}

export interface PaymentUrls {
    callback?: string;
    complete?: string;
    fail?: string;
    cancel?: string;
}

/**
 * Domain Model para el Detalle de Pago.
 * Mapeado desde el DTO, usando tipos nativos (Date) en lugar de timestamps (number).
 */
export interface PaymentDetail {
    id: string;
    accountId: string;
    amount: number; // Mapeado a valor decimal (dividido entre 100)
    amountEUR: number; // Mapeado a valor decimal
    currency: string;
    status: PaymentStatus;
    description?: string;
    descriptor?: string;

    // Transformados a objetos Date reales en el Mapper
    createdAt: Date;
    updatedAt?: Date;

    customer?: {
        name?: string;
        email?: string;
        phone?: string;
    };

    billingDetails?: ContactDetails;
    shippingDetails?: ContactDetails;
    paymentMethod?: PaymentMethodDetails;

    shop?: {
        name?: string;
        country?: string;
    };

    livemode: boolean;
    authorizationCode?: string;
    statusCode?: string;
    statusMessage?: string;
    fraudDetectorScore?: number;

    // En el DTO viene como Array<{key, value}>, pero en el dominio lo usamos como un Diccionario limpio
    metadata: Record<string, string>;

    urls: PaymentUrls;
}

export interface PaymentDetailDTO {
    id: string;
    accountId: string;
    providerId?: string;
    checkoutId: string;
    providerInternalId?: string;
    providerReferenceId?: string;
    createdAt: number;
    updatedAt?: number;
    amount: number;
    amountEUR?: number;
    authorizationCode?: string;
    currency: string;
    description?: string;
    descriptor?: string;
    livemode: boolean;
    status: string;
    statusCode?: string;
    statusMessage?: string;
    fraudDetectorScore?: number;
    callbackUrl?: string;
    completeUrl?: string;
    failUrl?: string;
    cancelUrl?: string;

    customer?: {
        name?: string;
        email?: string;
        phone?: string;
    };

    shop?: {
        name?: string;
        country?: string;
    };

    // Reemplazados los 'any' por los tipos reales de nuestro Schema!
    paymentMethod?: {
        method?: string;
        card?: {
            brand?: string;
            last4?: string;
            cardholderName?: string;
            expiration?: number; // AWSTimestamp
        };
        bizum?: {
            phoneNumber?: string;
        };
        paypal?: {
            email?: string;
        };
    };

    billingDetails?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: {
            city?: string;
            country?: string;
            line1?: string;
            line2?: string;
            zip?: string;
            state?: string;
        };
    };

    shippingDetails?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: {
            city?: string;
            country?: string;
            line1?: string;
            line2?: string;
            zip?: string;
            state?: string;
        };
    };

    // Metadata es un array de KeyValueItem en GraphQL
    metadata?: Array<{ key: string; value: string }>;
}