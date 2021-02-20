import MoviesMapper, { MoviesPageView } from './mappers/moviesPage';

import { MoviesPage } from './types/MoviesPage';
import { contentfulGraphQlClient as gqClient } from './client';
import movies from './queries/movies';

export const getMovies = async (): Promise<MoviesPageView[]> => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const { data } = await gqClient.query<MoviesPage>({
    query: movies,
    variables: { date: yesterday.toISOString() },
  });

  return new MoviesMapper().map(data);
};
