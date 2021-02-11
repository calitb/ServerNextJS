import { reposFixture, topicsFixture } from 'fixture/github';

export interface Repo {
  name: string;
  url: string;
  apiUrl: string;
  description: string;
  topics: string[];
}

export const fetchRepos = async (): Promise<Repo[]> => {
  let reposBody = undefined;
  if (process.env.USE_FIXTURE === 'true') {
    reposBody = reposFixture;
  } else {
    const response = await fetch('https://api.github.com/users/calitb/repos');
    reposBody = await response.json();
  }

  if (typeof reposBody === 'object') {
    console.log({ reposBody });
  }

  const repos: Repo[] = reposBody.reduce((acum: Repo[], repo: any) => {
    if (repo.name.startsWith('Sample-')) {
      acum.push({
        name: repo.name,
        url: repo.html_url,
        apiUrl: repo.url,
        description: repo.description,
        topics: [],
      });
    }

    return acum;
  }, [] as Repo[]);

  for (const repo of repos) {
    repo.topics = await fetchTopics(repo.apiUrl);
  }

  return repos;
};

const fetchTopics = async (apiUrl: string): Promise<string[]> => {
  if (process.env.USE_FIXTURE === 'true') {
    return topicsFixture.names;
  } else {
    const response = await fetch(apiUrl + '/topics', {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    });
    return (await response.json()).names;
  }
};
