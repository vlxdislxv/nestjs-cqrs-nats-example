import { IQueryHandler } from '@nestjs/cqrs';
import { DfsGraphQuery } from '../queries/impl';
import { GraphEntity, LinkedNode } from '../types';
import { FsGraphQuery } from './fs-graph.query';
import { GraphCQ } from './graph-cq';

export abstract class FsGraphHandler
  extends GraphCQ
  implements IQueryHandler<FsGraphQuery>
{
  public async execute(query: FsGraphQuery) {
    const { data } = await this.getById(query.graphId);
    if (!this.canFind(data, query)) return this.result([], 0);

    const { iterations, destNode } = this.fs(data, query);

    if (!destNode) return this.result([], iterations);

    const path: string[] = [query.destination];

    let prevNode = destNode.parent;
    while (prevNode) {
      path.push(prevNode.value);
      prevNode = prevNode.parent;
    }

    path.reverse();

    return this.result(path, iterations);
  }

  protected fs(graph: GraphEntity['data'], query: DfsGraphQuery) {
    const visited = new Set<string>();
    const queue: LinkedNode[] = [{ value: query.source, parent: null }];

    let iterations = 1;
    let destNode: LinkedNode = null;

    while (queue.length) {
      const node = this.nextEl(queue);

      if (node && !visited.has(node.value)) {
        visited.add(node.value);

        const nextNodes = graph[node.value];
        const index = nextNodes.indexOf(query.destination);

        if (index !== -1) {
          destNode = { value: query.destination, parent: node };
          break;
        }

        queue.push(...this.linkNodes(nextNodes, node));
      }

      iterations++;
    }

    return { iterations, destNode };
  }

  protected linkNodes(nodes: string[], parent: LinkedNode) {
    return nodes.map((value) => ({
      value,
      parent,
    }));
  }

  protected canFind(data: GraphEntity['data'], query: DfsGraphQuery) {
    if (!data[query.source]) return false;
    if (!data[query.destination]) return false;
    if (query.source === query.destination) return false;

    return true;
  }

  protected result(path: string[], iterations: number) {
    return { path, iterations };
  }

  protected abstract nextEl(queue: LinkedNode[]): LinkedNode;
}
