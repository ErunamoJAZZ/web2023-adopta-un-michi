'use client';

import {
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { onError } from '@apollo/client/link/error';
import { useRouter } from 'next/navigation';



// have a function to create a client for you
function makeClient() {
  const router = useRouter();
  let token: string | null = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('tokenMichis');
  }
  const headers = token
    ? {
      Authorization: `Bearer ${token}`,
    } : undefined;

  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: `${process.env.SERVER_URL}/graphql`,
    // you can disable result caching here if you want to
    headers,
    fetchOptions: { cache: 'no-store' },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      if (networkError.statusCode === 403) {
        console.log('REMOVIENDO TOKEN', token);
        localStorage.removeItem('tokenMichis');
        router.push('/login');
      }
    }
    if (graphQLErrors) {
      const denied= graphQLErrors.some((err) => err.message.includes('permission denied'))
      if (denied) {
        localStorage.removeItem('tokenMichis');
        router.push('/login');
      }
    }
  });

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
          errorLink,
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : ApolloLink.from([
          errorLink,
          httpLink,
        ]),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
export default makeClient;
