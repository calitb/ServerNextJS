import MapperBase from './base';
import { MoviesPage } from '../types/MoviesPage';

export interface MoviesPageView {
  date: string;
  name: string;
  image: string;
  url?: string;
  downloadUrl?: string;
  downloadPassword?: string;
}

export default class MoviesMapper extends MapperBase<MoviesPage, MoviesPageView[]> {
  public map(source: MoviesPage): MoviesPageView[] {
    const { items } = source.movies;

    const result: MoviesPageView[] = items.map(({ date, name, image, url, downloadUrl, downloadPassword }) => ({
      date: date ?? '',
      name: name ?? '',
      image: image.url ?? '',
      url: url,
      downloadUrl: downloadUrl,
      downloadPassword: downloadPassword,
    }));

    return result;
  }
}
