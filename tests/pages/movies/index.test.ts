import { MoviesProps, getServerSideProps } from '@/pages/movies';

import { GetServerSidePropsContext } from 'next';
import { MoviesPage } from '@/contentful/types/MoviesPage';
import { MoviesPageView } from '@/contentful/mappers/moviesPage';
import { ParsedUrlQuery } from 'querystring';
import { contentfulGraphQlClient as client } from '@/contentful/client';

jest.mock('@/contentful/client', () => {
  return {
    contentfulGraphQlClient: {
      query: jest.fn(),
    },
  };
});

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      pathname: '/movies',
    }),
  };
});

test('gets movies from contentful', async () => {
  const mock: MoviesPage = {
    nextMovies: {
      items: [
        {
          date: '2023-07-21T12:00:00.000Z',
          name: 'Movie1',
          image: {
            url: 'movie1.png',
          },
          url: 'http://image1.com',
          downloadUrl: 'http://movie1.com/download',
          downloadPassword: 'ABC',
        },
        {
          date: '2023-07-23T12:00:00.000Z',
          name: 'Movie2',
          image: {
            url: 'movie2.png',
          },
          url: null,
          downloadUrl: null,
          downloadPassword: null,
        },
      ],
    },
    futureMovies: {
      items: [
        {
          date: '2023-07-26T12:00:00.000Z',
          name: 'Movie3',
          image: {
            url: 'movie3.png',
          },
          url: 'http://image3.com',
          downloadUrl: 'http://movie3.com/download',
          downloadPassword: 'ABC',
        },
      ],
    },
  };

  (client.query as jest.Mock).mockResolvedValueOnce({
    data: mock,
  });

  const { props } = (await getServerSideProps({} as GetServerSidePropsContext<ParsedUrlQuery>)) as { props: MoviesProps; revalidate?: number | boolean };

  expect(props.movies).toEqual(result);
});

const result: MoviesPageView = {
  nextMovies: [
    {
      date: '2023-07-21T12:00:00.000Z',
      name: 'Movie1',
      image: 'movie1.png',
      url: 'http://image1.com',
      downloadUrl: 'http://movie1.com/download',
      downloadPassword: 'ABC',
    },
    {
      date: '2023-07-23T12:00:00.000Z',
      name: 'Movie2',
      image: 'movie2.png',
      url: null,
      downloadUrl: null,
      downloadPassword: null,
    },
  ],
  futureMovies: [
    {
      date: '2023-07-26T12:00:00.000Z',
      name: 'Movie3',
      image: 'movie3.png',
      url: 'http://image3.com',
      downloadUrl: 'http://movie3.com/download',
      downloadPassword: 'ABC',
    },
  ],
};
