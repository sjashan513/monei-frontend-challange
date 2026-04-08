import { gql } from '@apollo/client';

/**
 * GET_REVENUE_STATS_QUERY
 * Añadimos 'capturedAmount' por seguridad y pedimos los campos de totales.
 */
export const GET_REVENUE_STATS_QUERY = gql`
  query GetRevenueStats($start: Int!, $end: Int!, $interval: Interval!) {
    chargesDateRangeKPI(start: $start, end: $end, interval: $interval) {
      currency
      total {
        succeededAmount
        capturedAmount
        succeededCount
      }
      data {
        timestamp
        succeededAmount
        capturedAmount
      }
    }
  }
`;