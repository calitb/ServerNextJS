import axios, { AxiosResponse } from 'axios';
import { reposFixture, topicsFixture } from 'fixture/github';

export interface Repo {
  name: string;
  url: string;
  apiUrl: string;
  description: string;
  topics: string[];
}

const logAPILimit = (response?: AxiosResponse<any>) => {
  if (response) {
    console.log(`Remaining: ${response.headers['x-ratelimit-remaining']} of ${response.headers['x-ratelimit-limit']}`);
  }
};

export const fetchRepos = async (): Promise<Repo[]> => {
  let reposBody = undefined;
  if (process.env.USE_FIXTURE === 'true') {
    reposBody = reposFixture;
  } else {
    try {
      const response = await axios({
        url: 'https://api.github.com/users/calitb/repos',
        auth: {
          username: process.env.GITHUB_CLIENT_ID,
          password: process.env.GITHUB_CLIENT_SECRET,
        },
      });
      reposBody = response.data;
      logAPILimit(response);
    } catch (error) {
      if (error.response) {
        console.log('Error: ', error.response.statusText);
        logAPILimit(error.response);
      }
      throw error;
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
        auth: {
          username: process.env.GITHUB_CLIENT_ID,
          password: process.env.GITHUB_CLIENT_SECRET,
        },
      });
      logAPILimit(response);
      return response.data.names;
    } catch (error) {
      if (error.response) {
        console.log('Error: ', error.response.statusText);
        logAPILimit(error.response);
        throw error;
      }
    }
  }
};
