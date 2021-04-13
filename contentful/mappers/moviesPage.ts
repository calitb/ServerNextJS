import MapperBase from './base';
import { MoviesPage } from '../types/MoviesPage';

export interface MoviesPageView {
  pastMovies: Movie[];
  nextMovies: Movie[];
  futureMovies: Movie[];
}

export interface Movie {
  date: string;
  name: string;
  image: string;
  url?: string;
  downloadUrls?: string[];
  downloadPassword?: string;
  cancelled?: boolean;
}

export default class MoviesMapper extends MapperBase<MoviesPage, MoviesPageView> {
  public map(source: MoviesPage): MoviesPageView {
    const nextMovies: Movie[] = source.nextMovies.items.map(({ date, name, image, url, downloadUrl, downloadUrLs, downloadPassword }) => ({
      date: date ?? '',
      name: name ?? '',
      image: image.url ?? '',
      url,
      downloadUrls: downloadUrLs ?? (downloadUrl ? [downloadUrl] : null),
      downloadPassword,
    }));

    const futureMovies: Movie[] = source.futureMovies.items.map(({ date, name, image, url, downloadUrl, downloadUrLs, downloadPassword }) => ({
      date: date ?? '',
      name: name ?? '',
      image: image.url ?? '',
      url,
      downloadUrls: downloadUrLs ?? (downloadUrl ? [downloadUrl] : null),
      downloadPassword,
    }));

    const pastMovies: Movie[] = source.pastMovies.items.map(({ date, name, image, url, cancelled }) => ({
      date: date ?? '',
      name: name ?? '',
      image: image.url ?? '',
      url,
      cancelled,
    }));

    return {
      pastMovies,
      nextMovies,
      futureMovies,
    };
  }
}
