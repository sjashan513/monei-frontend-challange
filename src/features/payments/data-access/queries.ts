import { gql } from '@apollo/client';

/**
 * GET_CHARGES_QUERY
 * Adaptada a la estructura descubierta por introspección:
 * Paginación Offset (size, from) devolviendo un objeto con 'items' y 'total'.
 */
export const GET_CHARGES_QUERY = gql`
  query GetCharges($size: Int, $from: Int) {
    charges(size: $size, from: $from) {
      items {
        id
        amount
        currency
        description
        status
        createdAt
        customer {
          email
        }
      }
      total
    }
  }
`;