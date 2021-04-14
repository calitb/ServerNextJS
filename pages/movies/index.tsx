import Meta from "@/components/Meta";
import Modal from "@/components/Modal";
import MovieListItemView from "@/components/MovieListItemView";
import Navbar from "@/components/Navbar";
import PastMovieListItemView from "@/components/PastMovieListItemView";
import { getMovies } from "@/contentful/api";
import { Movie, MoviesPageView } from "@/contentful/mappers/moviesPage";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

export interface MoviesProps {
  movies: MoviesPageView;
}

export default function Pelis({
  movies: { nextMovies, futureMovies, pastMovies },
}: MoviesProps): JSX.Element {
  const [modalMovie, setModalMovie] = useState<Movie>();

  return (
    <>
      <Meta
        title="Próximas Películas"
        description="Horario para las próximas películas."
        url="/movies"
      />
      <Navbar />
      <main className="flex flex-col items-center notch">
        <Modal
          visible={Boolean(modalMovie)}
          title={modalMovie?.name ?? ""}
          msg={<DownloadLinks movie={modalMovie} />}
          ok="Close"
          onOk={() => setModalMovie(undefined)}
        />
        {nextMovies.length > 0 && (
          <section
            data-cy="nextmovies"
            className="flex flex-wrap justify-center"
          >
            <h2 className="text-center font-medium text-xl mt-4">
              Próximas Películas
            </h2>
            <div className="flex justify-center flex-wrap flex--movie w-full">
              {nextMovies.map((m, index) => (
                <MovieListItemView
                  key={m.name}
                  movie={m}
                  index={index}
                  onDownloadClick={(movie) => setModalMovie(movie)}
                />
              ))}
            </div>
          </section>
        )}

        {futureMovies.length > 0 && (
          <section
            data-cy="futuremovies"
            className="flex flex-wrap justify-center"
          >
            <h2 className="text-center font-medium text-xl mt-4">
              Películas Futuras
            </h2>
            <div className="flex justify-center flex-wrap flex--movie w-full">
              {futureMovies.map((m, index) => (
                <MovieListItemView
                  key={m.name}
                  movie={m}
                  index={index}
                  onDownloadClick={(movie) => setModalMovie(movie)}
                />
              ))}
            </div>
          </section>
        )}

        {pastMovies.length > 0 && (
          <section
            data-cy="futuremovies"
            className="flex flex-wrap justify-center"
          >
            <h2 className="text-center font-medium text-xl mt-4">
              Películas Pasadas
            </h2>
            <div className="flex justify-center flex-wrap flex--movie w-full">
              {pastMovies.map((m, index) => (
                <PastMovieListItemView key={m.name} movie={m} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

interface DownloadLinksProps {
  movie: Movie;
}

function DownloadLinks({ movie }: DownloadLinksProps): JSX.Element {
  return (
    <div className="flex flex-col">
      {movie.downloadUrls.map((url, index) => (
        <div key={index} className="flex">
          <Link href={url}>
            <a target="_blank" className="hover:text-gray-400 underline">
              Download
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<MoviesProps> = async () => {
  const movies = await getMovies();

  return { props: { movies } };
};
