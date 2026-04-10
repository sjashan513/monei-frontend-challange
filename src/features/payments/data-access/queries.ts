import { gql } from '@apollo/client';

export const GET_CHARGES_QUERY = gql`
  query GetCharges($size: Int, $from: Int, $filter: SearchableChargeFilterInput) {
    charges(size: $size, from: $from, filter: $filter) {
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

export const GET_CHARGE_QUERY = gql`
  query GetChargeDetails($id: ID!) {
    charge(id: $id) {
      id
      accountId
      providerId
      checkoutId
      providerInternalId
      providerReferenceId
      createdAt
      updatedAt
      amount
      amountEUR
      authorizationCode
      currency
      description
      descriptor
      livemode
      status
      statusCode
      statusMessage
      fraudDetectorScore
      callbackUrl
      completeUrl
      failUrl
      cancelUrl
      
      customer {
        name
        email
        phone
      }
      
      shop {
        name
        country
      }
      
      paymentMethod {
        method
        card {
          brand
          last4
          cardholderName
          expiration
        }
        bizum {
          phoneNumber
        }
        paypal {
          email
        }
      }

      billingDetails {
        name
        email
        phone
        address {
          city
          country
          line1
          line2
          zip
          state
        }
      }

      shippingDetails {
        name
        email
        phone
        address {
          city
          country
          line1
          line2
          zip
          state
        }
      }

      metadata {
        key
        value
      }
    }
  }
`;
