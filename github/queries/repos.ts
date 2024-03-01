import { gql } from "apollo-boost";

export default gql`
  query Repos {
    viewer {
      repositories(
        orderBy: { field: NAME, direction: ASC }
        first: 50
        privacy: PUBLIC
        isFork: false
      ) {
        edges {
          node {
            __typename
            ... on Repository {
              id
              name
              url
              description
              homepageUrl
              repositoryTopics(first: 6) {
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
