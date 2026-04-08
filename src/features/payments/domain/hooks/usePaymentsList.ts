import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { GET_CHARGES_QUERY } from "../../data-access/queries";
import { PaymentMapper } from "../mappers/PaymentMapper";
import type { Payment, PaymentDTO } from "../models/Payment";

interface ChargesResponse {
    charges: {
        items: PaymentDTO[];
        total: number;
    };
}
export const usePaymentsList = (first = 15) => {
    const { data, loading, error, fetchMore, networkStatus } =
        useQuery<ChargesResponse>(GET_CHARGES_QUERY, {
            variables: {
                first,
                after: null,
            },
            notifyOnNetworkStatusChange: true,
        });

    const payments: Payment[] = useMemo(() => {
        const rawList = data?.charges?.items || [];
        return PaymentMapper.toDomainList(rawList);
    }, [data]);

    const totalRecords = data?.charges?.total || 0;
    const hasMore = payments.length < totalRecords;
    const loadMore = async () => {
        if (loading || !hasMore) return;

        await fetchMore({
            variables: {
                from: payments.length,
            },
        });
    };

    return {
        payments,
        loading: loading && networkStatus === 1,
        isFetchingMore: networkStatus === 3,
        error,
        loadMore,
        hasMore,
    };
};
