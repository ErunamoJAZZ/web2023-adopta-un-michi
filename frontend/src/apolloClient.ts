import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => new ApolloClient({
  uri: `${process.env.SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default createApolloClient;
