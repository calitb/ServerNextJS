import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';

import fetch from 'cross-fetch';

const { API_GITHUB_PERSONAL_ACCESS_TOKEN } = process.env;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
});

export const githubGraphQlClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${API_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
  },
  fetch,
  cache: new InMemoryCache({
    addTypename: false,
    fragmentMatcher,
  }),
});
