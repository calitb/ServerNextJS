export type Repos = {
  viewer: {
    repositories: {
      edges: {
        node: {
          name: string;
          url: string;
          description: string;
          homepageUrl: string;
          repositoryTopics: {
            nodes: {
              topic: {
                name: string;
              };
            }[];
          };
        };
      }[];
    };
  };
};
