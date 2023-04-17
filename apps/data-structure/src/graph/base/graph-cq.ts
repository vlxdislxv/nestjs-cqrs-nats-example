import { NotFoundRpcException } from '@dsa/nats';
import { Injectable } from '@nestjs/common';
import { GraphRepository } from '../repositories';
import { GraphEntity } from '../types';

@Injectable()
export class GraphCQ {
  public constructor(protected readonly repo: GraphRepository) {}

  protected async getById(id: string) {
    const graph = await this.repo.findOneById(id);
    if (!graph) throw new NotFoundRpcException();
    return graph;
  }

  protected async getByIdTx(id: string) {
    const [graph, tx] = await this.repo.findOneByIdTx(id);

    if (!graph) {
      await tx.rollback();
      throw new NotFoundRpcException();
    }

    return { graph, tx };
  }

  protected addVertex({ data }: GraphEntity, value: string) {
    if (!data[value]) {
      data[value] = [];
    }

    return data[value];
  }
}
