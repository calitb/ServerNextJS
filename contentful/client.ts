import ApolloClient, { InMemoryCache } from 'apollo-boost';

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ENVIRONMENT } = process.env;

export const contentfulGraphQlClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/` + `spaces/${CONTENTFUL_SPACE_ID}/` + `environments/${CONTENTFUL_ENVIRONMENT}?` + `access_token=${CONTENTFUL_ACCESS_TOKEN}`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
