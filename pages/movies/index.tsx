import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { MoviesPageView } from '@/contentful/mappers/moviesPage';
import Navbar from '@/components/Navbar';
import { getMovies } from '@/contentful/api';

export interface MoviesProps {
  movies: MoviesPageView[];
}

export default function Pelis({ movies }: MoviesProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Movies Schedule</title>
      </Head>
      <Navbar />
      <main className="flex flex-wrap justify-center notch ">
        <div className="flex flex-wrap flex--movie w-full">
          {movies.map((m, index) => (
            <MovieListItemView key={m.name} movie={m} index={index} />
          ))}
        </div>
      </main>
    </>
  );
}

interface ListItemProps {
  movie: MoviesPageView;
  index: number;
}

function MovieListItemView({ index, movie: { name, date, url, downloadPassword, downloadUrl, image } }: ListItemProps): JSX.Element {
  return (
    <div id={`card-${index}`} className="w-75 rounded overflow-hidden shadow-lg m-4">
      <img className="w-75 h-110" src={image} alt={`${name} movie poster`} />

      <div className="flex flex-col justify-between px-4 py-2 bg-gray-800 h-36">
        <div>
          <h4 className="font-bold text-xs mb-2 text-gray-200">{new Date(date).toLocaleDateString()}</h4>
          <div className="block font-bold text-xl mb-2 text-gray-200">{name}</div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <Link href={downloadUrl}>
              <a target="_blank" className="text-sm text-gray-400 hover:text-gray-100 underline">
                Download
              </a>
            </Link>
            <p className="text-sm text-gray-400">Pass: {downloadPassword}</p>
          </div>
          <div className="flex items-end">
            <Link href={url}>
              <a target="_blank" className="flex justify-center items-center text-xs text-center font-medium py-1 px-2 rounded-full text-red-100 bg-red-700 border border-red-700">
                Info
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<MoviesProps> = async () => {
  const movies = await getMovies();

  return { props: { movies } };
};
