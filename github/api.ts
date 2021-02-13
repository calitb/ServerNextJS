import ReposMapper, { ReposViewModel } from './mappers/repos';

import { Repos } from './types/Repos';
import { githubGraphQlClient as gqClient } from './client';
import repos from './queries/repos';

export const getRepos = async (): Promise<ReposViewModel[]> => {
  const { data } = await gqClient.query<Repos>({
    query: repos,
  });

  return new ReposMapper().map(data);
};
