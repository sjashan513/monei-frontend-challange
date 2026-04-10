import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { GET_CHARGE_QUERY } from '../../data-access/queries';
import type { PaymentDetail, PaymentDetailDTO } from '../models/Payment';
import { PaymentDetailMapper } from '../mappers/PaymentDetailMapper';

interface ChargeResponse {
    charge: PaymentDetailDTO;
}

/**
 * usePaymentDetail
 * Hook de dominio para obtener y transformar el detalle de un cargo.
 */
export const usePaymentDetail = (id?: string) => {
    const { data, loading, error } = useQuery<ChargeResponse>(GET_CHARGE_QUERY, {
        variables: { id },
        skip: !id,
        fetchPolicy: 'cache-and-network'
    });

    // Transformamos el DTO de la API a nuestra Entidad de Dominio
    const payment: PaymentDetail | null = useMemo(() => {
        if (!data?.charge) return null;
        return PaymentDetailMapper.toDomain(data.charge);
    }, [data]);

    return {
        payment,
        loading,
        error,
    };
};