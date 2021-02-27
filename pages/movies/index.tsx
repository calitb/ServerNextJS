import { Movie, MoviesPageView } from '@/contentful/mappers/moviesPage';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import { getMovies } from '@/contentful/api';

export interface MoviesProps {
  movies: MoviesPageView;
}

export default function Pelis({ movies: { nextMovies, futureMovies } }: MoviesProps): JSX.Element {
  return (
    <>
      <Meta title="Próximas Películas" description="Horario para las próximas películas." url="/movies" />
      <Navbar />
      <main className="flex flex-col items-center notch">
        {nextMovies.length > 0 && (
          <section data-cy="nextmovies" className="flex flex-wrap justify-center">
            <h2 className="text-center font-medium text-xl mt-4">Próximas Películas</h2>
            <div className="flex justify-center flex-wrap flex--movie w-full">
              {nextMovies.map((m, index) => (
                <MovieListItemView key={m.name} movie={m} index={index} />
              ))}
            </div>
          </section>
        )}

        {futureMovies.length > 0 && (
          <section data-cy="futuremovies" className="flex flex-wrap justify-center">
            <h2 className="text-center font-medium text-xl mt-4">Películas Futuras</h2>
            <div className="flex justify-center flex-wrap flex--movie w-full">
              {futureMovies.map((m, index) => (
                <MovieListItemView key={m.name} movie={m} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

interface ListItemProps {
  movie: Movie;
  index: number;
}

function MovieListItemView({ index, movie: { name, date, url, downloadPassword, downloadUrl, image } }: ListItemProps): JSX.Element {
  return (
    <div id={`card-${index}`} className="w-75 rounded overflow-hidden shadow-lg m-4">
      <img data-cy="image" className="w-75 h-110" src={image} alt={`${name} movie poster`} />

      <div className="flex flex-col justify-between px-4 py-2 bg-gray-800 h-40">
        <div className="font-bold text-gray-200">
          <h4 data-cy="date" className="text-xs mb-2">
            {formatDate(date)}
          </h4>
          <div data-cy="name" className="text-xl mb-2">
            {name}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col text-md text-gray-400 ">
            {downloadUrl && (
              <Link href={downloadUrl}>
                <a target="_blank" className="hover:text-gray-100 underline">
                  Download
                </a>
              </Link>
            )}
            {downloadUrl && downloadPassword && <p>Pass: {downloadPassword}</p>}
          </div>
          <div className="flex items-center">
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
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const datetime = `${date.toLocaleDateString('es-PA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} - ${date.toLocaleTimeString('es-PA', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  })}`;
  return datetime;
}

export const getServerSideProps: GetServerSideProps<MoviesProps> = async () => {
  const movies = await getMovies();

  return { props: { movies } };
};
