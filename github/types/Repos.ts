/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Repos
// ====================================================

export interface Repos_viewer_repositories_edges_node_repositoryTopics_nodes_topic {
  /**
   * The topic's name.
   */
  name: string;
}

export interface Repos_viewer_repositories_edges_node_repositoryTopics_nodes {
  /**
   * The topic.
   */
  topic: Repos_viewer_repositories_edges_node_repositoryTopics_nodes_topic;
}

export interface Repos_viewer_repositories_edges_node_repositoryTopics {
  /**
   * A list of nodes.
   */
  nodes: (Repos_viewer_repositories_edges_node_repositoryTopics_nodes | null)[] | null;
}

export interface Repos_viewer_repositories_edges_node {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The HTTP URL for this repository
   */
  url: any;
  /**
   * The description of the repository.
   */
  description: string | null;
  /**
   * A list of applied repository-topic associations for this repository.
   */
  repositoryTopics: Repos_viewer_repositories_edges_node_repositoryTopics;
}

export interface Repos_viewer_repositories_edges {
  /**
   * The item at the end of the edge.
   */
  node: Repos_viewer_repositories_edges_node | null;
}

export interface Repos_viewer_repositories {
  /**
   * A list of edges.
   */
  edges: (Repos_viewer_repositories_edges | null)[] | null;
}

export interface Repos_viewer {
  /**
   * A list of repositories that the user owns.
   */
  repositories: Repos_viewer_repositories;
}

export interface Repos {
  /**
   * The currently authenticated user.
   */
  viewer: Repos_viewer;
}
