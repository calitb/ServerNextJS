import { Movie } from "@/contentful/mappers/moviesPage";
import Link from "next/link";
import React from "react";

interface ListItemProps {
  movie: Movie;
  index: number;
  onDownloadClick: (movie: Movie) => void;
}

export default function CompactMovieListItemView({
  index,
  movie,
  onDownloadClick,
}: ListItemProps): JSX.Element {
  const { name, date, url, downloadPassword, downloadUrls, image } = movie;

  return (
    <div
      id={`card-${index}`}
      className="w-75 rounded overflow-hidden shadow-lg m-4"
    >
      <img
        data-cy="image"
        className="w-75 h-110"
        src={image}
        alt={`${name} movie poster`}
      />

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
            <div className="flex flex-row">
              {downloadUrls && downloadUrls.length === 1 && (
                <Link href={downloadUrls[0]}>
                  <a target="_blank" className="hover:text-gray-100 underline">
                    Download
                  </a>
                </Link>
              )}
              {downloadUrls && downloadUrls.length > 1 && (
                <a
                  target="_blank"
                  className="hover:text-gray-100 underline cursor-pointer"
                  onClick={() => onDownloadClick(movie)}
                >
                  Downloads
                </a>
              )}
            </div>
            {downloadPassword && downloadPassword && (
              <p>Pass: {downloadPassword}</p>
            )}
          </div>
          <div className="flex items-center">
            {url && (
              <Link href={url}>
                <a
                  target="_blank"
                  className="w-16 flex justify-center items-center text-xs text-center font-medium py-1 px-2 rounded-full text-red-100 bg-red-700 border border-red-700"
                >
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
  const datetime = `${date.toLocaleDateString("es-PA", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  })} - ${date.toLocaleTimeString("es-PA", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  return datetime;
}
