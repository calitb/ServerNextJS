import { githubGraphQlClient as gqClient } from "./client";
import ReposMapper, { ReposViewModel } from "./mappers/repos";
import repos from "./queries/repos";
import { Repos } from "./types/Repos";

export const getRepos = async (): Promise<ReposViewModel[]> => {
  const { data } = await gqClient.query<Repos>({
    query: repos,
  });

  return new ReposMapper().map(data);
};
