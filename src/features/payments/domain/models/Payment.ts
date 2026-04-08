/**
 * Payment Status Type
 * Definimos los estados posibles según el negocio de MONEI.
 */
export type PaymentStatus = 'SUCCEEDED' | 'FAILED' | 'EXPIRED' | 'CANCELED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

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