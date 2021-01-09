import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT || 'https://hasura-oh6n.onrender.com/v1/graphql';
export const apollo = process.browser
  ? new ApolloClient({
      uri: HASURA_ENDPOINT,
      cache: new InMemoryCache(),
      ssrForceFetchDelay: 100
    })
  : new ApolloClient({
    // Make sure queries run once
    ssrMode: true,
     // Use SchemaLink to run queries on local schema (no round trips)
    link: new HttpLink({ uri: HASURA_ENDPOINT, fetch}),
    cache: new InMemoryCache(),
   })