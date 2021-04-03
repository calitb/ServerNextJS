/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MoviesPage
// ====================================================

export interface MoviesPage_nextMovies_items_image {
  url: string | null;
}

export interface MoviesPage_nextMovies_items {
  date: any | null;
  name: string | null;
  image: MoviesPage_nextMovies_items_image | null;
  url: string | null;
  downloadUrl: string | null;
  downloadPassword: string | null;
}

export interface MoviesPage_nextMovies {
  items: (MoviesPage_nextMovies_items | null)[];
}

export interface MoviesPage_futureMovies_items_image {
  url: string | null;
}

export interface MoviesPage_futureMovies_items {
  date: any | null;
  name: string | null;
  image: MoviesPage_futureMovies_items_image | null;
  url: string | null;
  downloadUrl: string | null;
  downloadPassword: string | null;
}

export interface MoviesPage_futureMovies {
  items: (MoviesPage_futureMovies_items | null)[];
}

export interface MoviesPage_pastMovies_items_image {
  url: string | null;
}

export interface MoviesPage_pastMovies_items {
  date: any | null;
  name: string | null;
  image: MoviesPage_pastMovies_items_image | null;
  url: string | null;
  cancelled: boolean | null;
}

export interface MoviesPage_pastMovies {
  items: (MoviesPage_pastMovies_items | null)[];
}

export interface MoviesPage {
  nextMovies: MoviesPage_nextMovies | null;
  futureMovies: MoviesPage_futureMovies | null;
  pastMovies: MoviesPage_pastMovies | null;
}

export interface MoviesPageVariables {
  date?: any | null;
  dateSplit?: any | null;
}
