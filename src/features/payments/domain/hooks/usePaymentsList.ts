import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { GET_CHARGES_QUERY } from "../../data-access/queries";
import { PaymentMapper } from "../mappers/PaymentMapper";
import type { Payment, PaymentDTO } from "../models/Payment";
import { useSearchParams } from "react-router-dom";

interface ChargesResponse {
    charges: {
        items: PaymentDTO[];
        total: number;
    };
}

interface Filters {
    status?: {
        eq: string;
    };
    createdAt?: {
        gte?: number; // Greater Than or Equal (desde)
        lte?: number; // Less Than or Equal (hasta)
    };

}
export const usePaymentsList = (first = 15) => {
    const [searchParams] = useSearchParams();

    const statusFilter = searchParams.get('status') || null;
    const startDateFilter = searchParams.get('start') || null;
    const endDateFilter = searchParams.get('end') || null;

    const filterVariables = useMemo(() => {
        const filter: Filters = {};

        if (statusFilter) {
            filter.status = { eq: statusFilter };
        }

        if (startDateFilter || endDateFilter) {
            filter.createdAt = {};

            if (startDateFilter) {
                const start = new Date(startDateFilter);
                start.setHours(0, 0, 0, 0);
                filter.createdAt.gte = Math.floor(start.getTime() / 1000);
            }

            if (endDateFilter) {
                const end = new Date(endDateFilter);
                end.setHours(23, 59, 59, 999);
                filter.createdAt.lte = Math.floor(end.getTime() / 1000);
            }
        }

        return Object.keys(filter).length > 0 ? filter : undefined;
    }, [statusFilter, startDateFilter, endDateFilter]);

    const { data, loading, error, fetchMore, networkStatus } =
        useQuery<ChargesResponse>(GET_CHARGES_QUERY, {
            variables: {
                first,
                after: null,
                filter: filterVariables ?? undefined,
            },
            notifyOnNetworkStatusChange: true,
            fetchPolicy: 'cache-and-network',
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
        totalRecords
    };
};
