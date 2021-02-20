import MoviesMapper, { MoviesPageView } from './mappers/moviesPage';

import { MoviesPage } from './types/MoviesPage';
import { contentfulGraphQlClient as gqClient } from './client';
import movies from './queries/movies';

export const getMovies = async (): Promise<MoviesPageView[]> => {
  const date = new Date();
  date.setHours(date.getHours() - 4);

  const { data } = await gqClient.query<MoviesPage>({
    query: movies,
    variables: { date: date.toISOString() },
  });

  return new MoviesMapper().map(data);
};
