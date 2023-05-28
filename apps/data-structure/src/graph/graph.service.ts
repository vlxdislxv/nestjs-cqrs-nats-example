import { BadRequestRpcException, NotFoundRpcException } from '@dsa/nats';
import { FsEngineEnum, GraphData } from '@dsa/nats/services/graph/dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  AddEdgeCommand,
  AddVertexCommand,
  CreateGraphCommand,
  DeleteEdgeCommand,
  DeleteGraphCommand,
  DeleteVertexCommand,
} from './commands/impl';
import { FsEngine } from './core';
import { FsGraphQuery } from './queries/impl';
import { GraphRepository } from './repositories';

@Injectable()
export class GraphService {
  public constructor(
    @Inject('FsEnginesMap')
    private readonly fseMap: Map<FsEngineEnum, FsEngine>,
    private readonly repo: GraphRepository,
  ) {}

  public getAll() {
    return this.repo.findAll();
  }

  public create(command: CreateGraphCommand) {
    const data = command.nodes.reduce(
      (data, node) => ({
        ...data,
        [node]: [] as string[],
      }),
      {} as GraphData,
    );

    return this.repo.store(data);
  }

  public async fs(query: FsGraphQuery) {
    const { data } = await this.getById(query.graphId);

    const fse = this.fseMap.get(query.engine);
    if (!fse) throw new BadRequestRpcException('Unsupported Engine.');

    return fse.run({
      source: query.source,
      destination: query.destination,
      graph: data,
    });
  }

  public async getById(id: string) {
    const graph = await this.repo.findOneById(id);
    if (!graph) throw new NotFoundRpcException();
    return graph;
  }

  public async addEdge(command: AddEdgeCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);
    const srcNodes = this.pushVertex(graph.data, command.source);

    this.pushVertex(graph.data, command.destination);

    if (srcNodes.indexOf(command.destination) === -1) {
      srcNodes.push(command.destination);
    }

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }

  public async addVertex(command: AddVertexCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);

    this.pushVertex(graph.data, command.value);

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }

  public async deleteEdge(command: DeleteEdgeCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);
    const srcNodes = graph.data[command.source];

    if (!srcNodes) {
      await tx.rollback();
      return graph;
    }

    const index = srcNodes.indexOf(command.destination);

    if (index === -1) {
      await tx.rollback();
      return graph;
    }

    srcNodes.splice(index, 1);

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }

  public async deleteVertex(command: DeleteVertexCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);

    if (graph.data[command.value]) {
      delete graph.data[command.value];

      for (const nodes of Object.values(graph.data)) {
        const index = nodes.indexOf(command.value);

        if (index !== -1) {
          nodes.splice(index, 1);
        }
      }

      await this.repo.updateTx(tx, graph);
      await tx.commit();
    } else {
      await tx.rollback();
    }

    return graph;
  }

  public async delete(command: DeleteGraphCommand) {
    const raws = await this.repo.delete(command.id);
    if (!raws) throw new NotFoundRpcException();
    return true;
  }

  private async getByIdTx(id: string) {
    const [graph, tx] = await this.repo.findOneByIdTx(id);

    if (!graph) {
      await tx.rollback();
      throw new NotFoundRpcException();
    }

    return { graph, tx };
  }

  private pushVertex(data: GraphData, value: string) {
    if (!data[value]) {
      data[value] = [];
    }

    return data[value];
  }
}
