import { gql } from 'apollo-boost';

export default gql`
  query MoviesPage($date: DateTime) {
    movies: moviesCollection(limit: 8, where: { date_gte: $date }, order: [date_ASC, sys_publishedAt_ASC]) {
      items {
        date
        name
        image {
          url
        }
        url
        downloadUrl
        downloadPassword
      }
    }
  }
`;
