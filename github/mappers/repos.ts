import MapperBase from './base';
import { Repos } from '../types/Repos';

export interface ReposViewModel {
  name: string;
  url: string;
  description: string;
  topics: string[];
}

export default class ReposMapper extends MapperBase<Repos, ReposViewModel[]> {
  public map(source: Repos): ReposViewModel[] {
    const { edges } = source.viewer.repositories;

    const result = edges.reduce((acum, value) => {
      const {
        node: { name, url, description, repositoryTopics },
      } = value;
      if (name.startsWith('Sample-')) {
        acum.push({
          name,
          url,
          description,
          topics: repositoryTopics.nodes.map((node) => node.topic.name),
        });
      }

      return acum;
    }, [] as ReposViewModel[]);

    return result;
  }
}
