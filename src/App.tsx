import { ApolloProvider } from '@apollo/client/react';
import { client } from '@/core/apollo/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/core/router/AppRouter';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}