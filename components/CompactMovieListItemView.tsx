import Link from 'next/link';
import { Movie } from '@/contentful/mappers/moviesPage';

interface ListItemProps {
  movie: Movie;
  index: number;
}

export default function MovieListItemView({ index, movie: { name, date, url, image } }: ListItemProps): JSX.Element {
  return (
    <div id={`card-${index}`} className="w-37.5 rounded overflow-hidden shadow-lg m-4">
      <img data-cy="image" className="w-37.5 h-55" src={image} alt={`${name} movie poster`} />

      <div className="flex flex-col justify-between px-4 py-2 bg-gray-800 h-40">
        <div className="font-bold text-gray-200">
          <h4 data-cy="date" className="text-xs mb-2">
            {formatDate(date)}
          </h4>
          <div data-cy="name" className=" mb-2">
            {name}
          </div>
        </div>

        <div className="flex justify-between">
          {url && (
            <Link href={url}>
              <a target="_blank" className="w-16 flex justify-center items-center text-xs text-center font-medium py-1 px-2 rounded-full text-red-100 bg-red-700 border border-red-700">
                Info
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-PA', { day: 'numeric', month: 'numeric', year: 'numeric' });
}
