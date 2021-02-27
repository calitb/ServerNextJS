import { client, locale, publish, spaceId, targetEnv } from '../environment/management';

(async () => {
  const space = await client.getSpace(spaceId);
  const env = await space.getEnvironment(targetEnv);

  const movieImage1 = await env.createAsset({
    fields: {
      title: { [locale]: 'Movie1' },
      file: {
        [locale]: {
          upload: 'https://via.placeholder.com/300x440?text=Movie1',
          contentType: 'image/png',
          fileName: 'movie1.png',
        },
      },
    },
  });
  await movieImage1.processForLocale(locale);
  await publish(await env.getAsset(movieImage1.sys.id));

  const movieImage2 = await env.createAsset({
    fields: {
      title: { [locale]: 'Movie2' },
      file: {
        [locale]: {
          upload: 'https://via.placeholder.com/300x440?text=Movie2',
          contentType: 'image/png',
          fileName: 'movie2.png',
        },
      },
    },
  });
  await movieImage2.processForLocale(locale);
  await publish(await env.getAsset(movieImage2.sys.id));

  const movieImage3 = await env.createAsset({
    fields: {
      title: { [locale]: 'Movie3' },
      file: {
        [locale]: {
          upload: 'https://via.placeholder.com/300x440?text=Movie3',
          contentType: 'image/png',
          fileName: 'movie3.png',
        },
      },
    },
  });
  await movieImage3.processForLocale(locale);
  await publish(await env.getAsset(movieImage3.sys.id));

  const date = new Date();
  date.setHours(date.getHours() + 3 * 24);
  const movie1 = await env.createEntry('movies', {
    fields: {
      name: { [locale]: 'Movie1' },
      date: { [locale]: date.toISOString() },
      url: { [locale]: 'http://movie1.com' },
      downloadUrl: { [locale]: 'http://movie1.com/download' },
      downloadPassword: { [locale]: 'ABC' },
      image: {
        [locale]: {
          sys: {
            id: movieImage1.sys.id,
            type: 'Link',
            linkType: 'Asset',
          },
        },
      },
    },
  });
  await publish(movie1);

  const movie2 = await env.createEntry('movies', {
    fields: {
      name: { [locale]: 'Movie2' },
      date: { [locale]: '2023-07-21T12:00:00.000Z' },
      url: { [locale]: 'http://movie2.com' },
      downloadUrl: { [locale]: 'http://movie2.com/download' },
      downloadPassword: { [locale]: 'ABC' },
      image: {
        [locale]: {
          sys: {
            id: movieImage2.sys.id,
            type: 'Link',
            linkType: 'Asset',
          },
        },
      },
    },
  });
  await publish(movie2);

  const movie3 = await env.createEntry('movies', {
    fields: {
      name: { [locale]: 'Movie3' },
      date: { [locale]: '2023-07-23T12:00:00.000Z' },
      image: {
        [locale]: {
          sys: {
            id: movieImage3.sys.id,
            type: 'Link',
            linkType: 'Asset',
          },
        },
      },
    },
  });
  await publish(movie3);
})();

export {};
