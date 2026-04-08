import type { PaymentAnalytics, ChartPoint, AnalyticsDTO } from "../models/Analytics";

/**
 * AnalyticsMapper
 * Transforma los datos financieros de la API (cents, raw points)
 * en entidades de dominio listas para ser consumidas por la UI.
 */
export const AnalyticsMapper = {
    toDomain(raw?: AnalyticsDTO): PaymentAnalytics {
        if (!raw || !raw.total) {
            return { totalAmount: 0, transactionCount: 0, averageValue: 0, currency: 'EUR', chartData: [] };
        }

        // Sumamos succeeded + captured por si la API reparte el dinero entre ambos
        const totalAmount = (raw.total.succeededAmount + raw.total.capturedAmount) / 100;
        const count = raw.total.succeededCount;

        return {
            totalAmount,
            transactionCount: count,
            averageValue: count > 0 ? totalAmount / count : 0,
            currency: raw.currency || 'EUR',
            chartData: this.toChartPoints(raw.data)
        };
    },

    toChartPoints(data: AnalyticsDTO['data']): ChartPoint[] {
        if (!Array.isArray(data)) return [];
        return data.map(point => {
            const date = new Date(point.timestamp * 1000);
            // Formato más claro para meses o días
            const label = date.toLocaleDateString('es-ES', {
                month: 'short',
                day: 'numeric',
                year: '2-digit'
            });

            return {
                label,
                amount: (point.succeededAmount + point.capturedAmount) / 100,
                count: 0
            };
        });
    }
};