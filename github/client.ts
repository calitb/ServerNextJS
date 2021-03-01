import ApolloClient, { InMemoryCache } from 'apollo-boost';

const { API_GITHUB_PERSONAL_ACCESS_TOKEN } = process.env;

export const githubGraphQlClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${API_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
