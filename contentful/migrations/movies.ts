import { MigrationFunction } from 'contentful-migration';

module.exports = function (migration) {
  const movie = migration.createContentType('movies', {
    name: 'Movie',
    displayField: 'name',
  });

  movie
    .createField('name')
    .name('Name')
    .required(true)
    .type('Symbol')
    .validations([
      {
        unique: true,
      },
    ]);
  movie.createField('date').name('Streaming date').required(true).type('Date');
  movie.createField('image').name('Image').required(true).type('Link').linkType('Asset');
  movie
    .createField('url')
    .name('Info URL')
    .type('Symbol')
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
          flags: null,
        },
      },
    ]);
  movie
    .createField('downloadUrl')
    .name('Download URL')
    .type('Symbol')
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
          flags: null,
        },
      },
    ]);
  movie.createField('downloadPassword').name('Download Password').type('Symbol');
  movie.createField('cancelled').name('Cancelled').type('Boolean');
} as MigrationFunction;
