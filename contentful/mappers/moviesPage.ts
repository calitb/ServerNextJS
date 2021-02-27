import MapperBase from './base';
import { MoviesPage } from '../types/MoviesPage';

export interface MoviesPageView {
  nextMovies: Movie[];
  futureMovies: Movie[];
}

export interface Movie {
  date: string;
  name: string;
  image: string;
  url?: string;
  downloadUrl?: string;
  downloadPassword?: string;
}

export default class MoviesMapper extends MapperBase<MoviesPage, MoviesPageView> {
  public map(source: MoviesPage): MoviesPageView {
    const nextMovies: Movie[] = source.nextMovies.items.map(({ date, name, image, url, downloadUrl, downloadPassword }) => ({
      date: date ?? '',
      name: name ?? '',
      image: image.url ?? '',
      url: url,
      downloadUrl: downloadUrl,
      downloadPassword: downloadPassword,
    }));

    const futureMovies: Movie[] = source.futureMovies.items.map(({ date, name, image, url, downloadUrl, downloadPassword }) => ({
      date: date ?? '',
      name: name ?? '',
      image: image.url ?? '',
      url: url,
      downloadUrl: downloadUrl,
      downloadPassword: downloadPassword,
    }));

    return {
      nextMovies,
      futureMovies,
    };
  }
}
