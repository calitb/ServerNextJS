import Link from 'next/link';
import { Movie } from '@/contentful/mappers/moviesPage';
import styles from './index.module.css';

interface ListItemProps {
  movie: Movie;
  index: number;
}

export default function PastMovieListItemView({ index, movie: { name, date, url, image, cancelled } }: ListItemProps): JSX.Element {
  return (
    <div id={`card-${index}`} className="w-37.5 rounded overflow-hidden shadow-lg m-4">
      <div className={`relative ${cancelled && styles['past-movie-container']}`}>
        <img data-cy="image" className="w-37.5 h-55" src={image} alt={`${name} movie poster`} />
      </div>

      <div className="flex flex-col justify-between px-4 py-2 bg-gray-800 h-28">
        <div className="font-bold text-gray-200">
          <h4 data-cy="date" className="text-xs mb-2">
            {formatDate(date)}
          </h4>

          <div data-cy="name" className="text-sm underline mb-2">
            <Link href={url}>
              <a target="_blank">{name}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-PA', { day: 'numeric', month: 'numeric', year: 'numeric' });
}
