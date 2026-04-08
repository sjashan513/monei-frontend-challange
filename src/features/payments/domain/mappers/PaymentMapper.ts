import type { Payment, PaymentDTO, PaymentStatus } from "../models/Payment";

/**
 * PaymentMapper
 * * Siguiendo la Arquitectura Hexagonal, este es nuestro Adaptador de Salida.
 * Convierte el DTO (Data Transfer Object) de la API en nuestra Entidad de Dominio.
 */
export const PaymentMapper = {
    /**
     * Mapea un cargo individual desde la respuesta cruda de GraphQL.
     * Maneja la conversión de Unix Timestamp a Date de JavaScript.
     */
    toDomain(raw: PaymentDTO): Payment {
        if (!raw) return {} as Payment;
        return {
            id: raw.id,
            amount: raw.amount / 100, // Asumimos que MONEI envía céntimos
            currency: raw.currency || 'EUR',
            description: raw.description || 'No description',
            status: (raw.status as PaymentStatus) || 'PENDING',
            // MONEI envía Unix timestamps (segundos), JS necesita milisegundos.
            createdAt: new Date(raw.createdAt * 1000),
            referenceId: raw.referenceId,
            customerEmail: raw.customer?.email
        };
    },

    /**
     * Mapea una lista de cargos.
     */
    toDomainList(rawList: PaymentDTO[]): Payment[] {
        if (!Array.isArray(rawList)) return [];
        return rawList.map(item => this.toDomain(item));
    }
};