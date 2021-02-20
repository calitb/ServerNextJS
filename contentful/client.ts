import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-boost";
import { createClient } from "contentful";
import fetch from 'cross-fetch';

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
} = process.env;

export const contentfulClient = createClient({
  space: <string>CONTENTFUL_SPACE_ID,
  accessToken: <string>CONTENTFUL_ACCESS_TOKEN,
  environment: CONTENTFUL_ENVIRONMENT,
});


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
});

export const contentfulGraphQlClient = new ApolloClient({
  uri:
    `https://graphql.contentful.com/content/v1/` +
    `spaces/${CONTENTFUL_SPACE_ID}/` +
    `environments/${CONTENTFUL_ENVIRONMENT}?` +
    `access_token=${CONTENTFUL_ACCESS_TOKEN}`,
  fetch,
  cache: new InMemoryCache({
    addTypename: false,
    fragmentMatcher
  }),
});

