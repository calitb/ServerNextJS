import { gql } from 'apollo-boost';

export default gql`
  query MoviesPage($date: DateTime, $dateSplit: DateTime) {
    nextMovies: moviesCollection(limit: 8, where: { date_gte: $date, date_lt: $dateSplit }, order: [date_ASC, sys_publishedAt_ASC]) {
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
    futureMovies: moviesCollection(limit: 8, where: { date_gte: $dateSplit }, order: [date_ASC, sys_publishedAt_ASC]) {
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
    pastMovies: moviesCollection(where: { date_lt: $date }, order: [date_DESC, sys_publishedAt_ASC]) {
      items {
        date
        name
        image {
          url
        }
        url
      }
    }
  }
`;
