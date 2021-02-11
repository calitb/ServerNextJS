import axios, { AxiosResponse } from 'axios';
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
    try {
      const response = await axios.get('https://api.github.com/users/calitb/repos');
      reposBody = response.data;
    } catch (error) {
      if (error.response) {
        reposBody = [];
        console.log('Error: ', error.response.statusText);
        console.log('Remaining: ', error.response.headers['x-ratelimit-remaining']);
      }
    }
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
    try {
      const response: AxiosResponse<{ names: string[] }> = await axios({
        headers: { Accept: 'application/vnd.github.mercy-preview+json' },
        url: apiUrl + '/topics',
      });
      return response.data.names;
    } catch (error) {
      if (error.response) {
        console.log('Error: ', error.response.statusText);
        console.log('Remaining: ', error.response.headers['x-ratelimit-remaining']);
        return [];
      }
    }
  }
};
