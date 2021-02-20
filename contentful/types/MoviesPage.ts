/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MoviesPage
// ====================================================

export interface MoviesPage_movies_items_image {
  url: string | null;
}

export interface MoviesPage_movies_items {
  date: any | null;
  name: string | null;
  image: MoviesPage_movies_items_image | null;
  url: string | null;
  downloadUrl: string | null;
  downloadPassword: string | null;
}

export interface MoviesPage_movies {
  items: (MoviesPage_movies_items | null)[];
}

export interface MoviesPage {
  movies: MoviesPage_movies | null;
}
