/**
 * ChartPoint
 * Representa un punto individual en la serie temporal de ingresos.
 */
export interface ChartPoint {
    label: string;
    amount: number;
    count: number;
}

/**
 * Analytics Domain Entity
 * Representa los KPIs procesados para el Dashboard.
 */
export interface PaymentAnalytics {
    totalAmount: number;
    transactionCount: number;
    averageValue: number;
    currency: string;
    chartData: ChartPoint[];
}

/**
 * AnalyticsDTO
 * Estructura cruda que devuelve el endpoint chargesDateRangeKPI.
 */
export interface AnalyticsDTO {
    currency: string;
    total: {
        succeededAmount: number;
        capturedAmount: number;
        succeededCount: number;
    };
    data: Array<{
        timestamp: number;
        succeededAmount: number;
        capturedAmount: number;
    }>;
}