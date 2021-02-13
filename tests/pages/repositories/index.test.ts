/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ReposProps, getStaticProps } from '@/pages/repositories';

import { Repos } from '@/github/types/Repos';
import { ReposViewModel } from '@/github/mappers/repos';
import { githubGraphQlClient as client } from '@/github/client';

jest.mock('@/github/client', () => {
  return {
    githubGraphQlClient: {
      query: jest.fn(),
    },
  };
});

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      pathname: '/repositories',
    }),
  };
});

test('gets repos from github', async () => {
  const mock: Repos = {
    viewer: {
      repositories: {
        edges: [
          {
            node: {
              __typename: 'Repository',
              id: 'id1',
              name: 'repo1',
              url: 'https://github.com/calitb/repo1',
              description: null,
              repositoryTopics: {
                nodes: [],
              },
            },
          },
          {
            node: {
              __typename: 'Repository',
              id: 'id2',
              name: 'repo2',
              url: 'https://github.com/calitb/repo2',
              description: null,
              repositoryTopics: {
                nodes: [],
              },
            },
          },
          {
            node: {
              __typename: 'Repository',
              id: 'id3=',
              name: 'Sample-repo3',
              url: 'https://github.com/calitb/Sample-repo3',
              description: 'description3',
              repositoryTopics: {
                nodes: [
                  {
                    topic: {
                      name: 'reactjs',
                    },
                  },
                  {
                    topic: {
                      name: 'githubworkflow',
                    },
                  },
                  {
                    topic: {
                      name: 'beanstalk',
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: 'Repository',
              id: 'id4=',
              name: 'Sample-repo4',
              url: 'https://github.com/calitb/Sample-repo4',
              description: 'description4',
              repositoryTopics: {
                nodes: [
                  {
                    topic: {
                      name: 'graphql-client',
                    },
                  },
                  {
                    topic: {
                      name: 'reactnative',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  };

  (client.query as jest.Mock).mockResolvedValueOnce({
    data: mock,
  });

  const { props } = (await getStaticProps({})) as { props: ReposProps; revalidate?: number | boolean };

  expect(props.repos).toEqual(result);
});

const result: ReposViewModel[] = [
  {
    name: 'Sample-repo3',
    url: 'https://github.com/calitb/Sample-repo3',
    description: 'description3',
    topics: ['reactjs', 'githubworkflow', 'beanstalk'],
  },
  {
    name: 'Sample-repo4',
    url: 'https://github.com/calitb/Sample-repo4',
    description: 'description4',
    topics: ['graphql-client', 'reactnative'],
  },
];
