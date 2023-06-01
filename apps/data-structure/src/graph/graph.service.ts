import { BadRequestRpcException, NotFoundRpcException } from '@dsa/nats';
import { FsEngineEnum, GraphData } from '@dsa/svc/graph';
import { Inject, Injectable } from '@nestjs/common';
import { GraphRepository } from './repositories';
import {
  AddEdgeSvcDto,
  AddVertexSvcDto,
  DeleteEdgeSvcDto,
  DeleteVertexSvcDto,
  FsGraphSvcDto,
} from './svc/dto';
import { FsEngine } from './svc/fs';

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

  public create(nodes: string[]) {
    const data = nodes.reduce(
      (data, node) => ({
        ...data,
        [node]: [] as string[],
      }),
      {} as GraphData,
    );

    return this.repo.store(data);
  }

  public async fs(dto: FsGraphSvcDto) {
    const { data } = await this.getById(dto.graphId);

    const fse = this.fseMap.get(dto.engine);
    if (!fse) throw new BadRequestRpcException('Unsupported Engine.');

    return fse.run({
      source: dto.source,
      destination: dto.destination,
      graph: data,
    });
  }

  public async getById(id: string) {
    const graph = await this.repo.findOneById(id);
    if (!graph) throw new NotFoundRpcException();
    return graph;
  }

  public async addEdge(dto: AddEdgeSvcDto) {
    const { graph, tx } = await this.getByIdTx(dto.graphId);
    const srcNodes = this.pushVertex(graph.data, dto.source);

    this.pushVertex(graph.data, dto.destination);

    if (srcNodes.indexOf(dto.destination) === -1) {
      srcNodes.push(dto.destination);
    }

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }

  public async addVertex(dto: AddVertexSvcDto) {
    const { graph, tx } = await this.getByIdTx(dto.graphId);

    this.pushVertex(graph.data, dto.value);

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }

  public async deleteEdge(dto: DeleteEdgeSvcDto) {
    const { graph, tx } = await this.getByIdTx(dto.graphId);
    const srcNodes = graph.data[dto.source];

    if (!srcNodes) {
      await tx.rollback();
      return graph;
    }

    const index = srcNodes.indexOf(dto.destination);

    if (index === -1) {
      await tx.rollback();
      return graph;
    }

    srcNodes.splice(index, 1);

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }

  public async deleteVertex(dto: DeleteVertexSvcDto) {
    const { graph, tx } = await this.getByIdTx(dto.graphId);

    if (graph.data[dto.value]) {
      delete graph.data[dto.value];

      for (const nodes of Object.values(graph.data)) {
        const index = nodes.indexOf(dto.value);

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

  public async delete(id: string) {
    const raws = await this.repo.delete(id);
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
