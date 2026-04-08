import {
    ApolloClient,
    InMemoryCache,
    CombinedGraphQLErrors,
    HttpLink,
    ApolloLink,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';

const GRAPHQL_URL = "/api/graphql";
const API_KEY = import.meta.env.VITE_MONEI_API_KEY as string;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authLink = new SetContextLink((prevContext, _) => {
    const { headers } = prevContext || {};

    return {
        headers: {
            ...headers,
            authorization: API_KEY ? API_KEY : "",
        },
    };
});

const errorLink = new ErrorLink(({ error }) => {

    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) => {
            console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    else if (error) {
        console.error(`Network error: ${error}`);
    }

});

const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
});

/**
 * Apollo Cache configuration
 */

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                charges: {
                    keyArgs: false, // Ignoramos los argumentos para que todo vaya a la misma lista
                    merge(existing, incoming) {
                        if (!existing) return incoming;

                        return {
                            ...incoming,
                            // Fusionamos los arrays de items, manteniendo el total actualizado
                            items: [...(existing.items || []), ...(incoming.items || [])],
                        };
                    }
                }
            }
        }
    }
})
const link = ApolloLink.from([errorLink, authLink, httpLink]);

// Initialize Apollo Client(Singleton)
export const client = new ApolloClient({
    link,
    cache,
    devtools: {
        enabled: !!import.meta.env.DEV,
    },
})