import { FsRunData, LinkedNode } from '../types';

export abstract class FsEngine {
  public run(data: FsRunData) {
    if (!this.canFind(data)) return this.result([], 0);

    const { iterations, destNode } = this.fs(data);

    if (!destNode) return this.result([], iterations);

    const path: string[] = [data.destination];

    let prevNode = destNode.parent;
    while (prevNode) {
      path.push(prevNode.value);
      prevNode = prevNode.parent;
    }

    path.reverse();

    return this.result(path, iterations);
  }

  protected fs({ graph, source, destination }: FsRunData) {
    const visited = new Set<string>();
    const queue: LinkedNode[] = [{ value: source, parent: null }];

    let iterations = 0;
    let destNode: LinkedNode = null;

    while (queue.length) {
      iterations++;

      const node = this.nextEl(queue);

      if (node && !visited.has(node.value)) {
        visited.add(node.value);

        const nextNodes = graph[node.value];
        const index = nextNodes.indexOf(destination);

        if (index !== -1) {
          destNode = { value: destination, parent: node };
          break;
        }

        queue.push(...this.linkNodes(nextNodes, node));
      }
    }

    return { iterations, destNode };
  }

  protected linkNodes(nodes: string[], parent: LinkedNode) {
    return nodes.map((value) => ({
      value,
      parent,
    }));
  }

  protected canFind({ graph, source, destination }: FsRunData) {
    if (!graph[source]) return false;
    if (!graph[destination]) return false;
    if (source === destination) return false;

    return true;
  }

  protected result(path: string[], iterations: number) {
    return { path, iterations };
  }

  protected abstract nextEl(queue: LinkedNode[]): LinkedNode;
}
