import { gql } from 'apollo-boost';

export default gql`
  query Repos {
    viewer {
      repositories(orderBy: { field: NAME, direction: ASC }, first: 50, privacy: PUBLIC, isFork: false) {
        edges {
          node {
            __typename
            ... on Repository {
              id
              name
              url
              description
              repositoryTopics(first: 50) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
