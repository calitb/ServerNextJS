import { Repos } from "../types/Repos";
import MapperBase from "./base";

export interface ReposViewModel {
  name: string;
  url: string;
  description: string;
  topics: string[];
  homepageUrl: string;
}

export default class ReposMapper extends MapperBase<Repos, ReposViewModel[]> {
  public map(source: Repos): ReposViewModel[] {
    const { edges } = source.viewer.repositories;

    const result = edges?.reduce((acum, value) => {
      const {
        node: { name, url, description, repositoryTopics, homepageUrl },
      } = value;

      acum.push({
        name,
        url,
        description,
        topics: repositoryTopics.nodes.map((node) => node.topic.name),
        homepageUrl,
      });

      return acum;
    }, [] as ReposViewModel[]);

    return result;
  }
}
