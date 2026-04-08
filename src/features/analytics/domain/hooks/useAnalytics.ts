import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { GET_REVENUE_STATS_QUERY } from '../../data-access/queries';
import { AnalyticsMapper } from '../mappers/AnalyticsMapper';
import type { PaymentAnalytics, AnalyticsDTO } from '../models/Analytics';

interface RevenueStatsResponse {
    chargesDateRangeKPI: AnalyticsDTO;
}


export const useAnalytics = (days = 365) => {
    // Calculamos los Unix Timestamps (segundos)
    const queryVariables = useMemo(() => {
        const end = Math.floor(new Date().getTime() / 1000);
        const start = end - (days * 24 * 60 * 60);

        return {
            start,
            end,
            interval: days > 30 ? 'month' : 'day'
        };
    }, [days]);

    const { data, loading, error } = useQuery<RevenueStatsResponse>(GET_REVENUE_STATS_QUERY, {
        variables: queryVariables,
        // Eliminamos el log de introspección para limpiar la consola
    });
    console.log(error)

    const stats: PaymentAnalytics = useMemo(() => {
        return AnalyticsMapper.toDomain(data?.chargesDateRangeKPI);
    }, [data]);

    return {
        stats,
        loading,
        error
    };
};


