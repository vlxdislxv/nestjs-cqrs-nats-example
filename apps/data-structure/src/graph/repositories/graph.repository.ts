import { KnexRepository } from '@dsa/knex';
import type { Knex } from 'knex';
import { GraphEntity } from '../types';

export class GraphRepository extends KnexRepository {
  protected readonly table = 'graphs';

  public findAll(): Promise<GraphEntity[]> {
    return this.query().select<GraphEntity[]>('id', 'data');
  }

  public async findOneById(id: string): Promise<GraphEntity> {
    const result = await this.query()
      .select('data')
      .where({ id })
      .first<Pick<GraphEntity, 'data'>>();

    if (!result) return null;

    return { id, ...result };
  }

  public async findOneByIdTx(
    id: string,
  ): Promise<[GraphEntity, Knex.Transaction]> {
    const tx = await this.knex.transaction();

    const result = await this.query()
      .transacting(tx)
      .forUpdate()
      .select('data')
      .where({ id })
      .first<Pick<GraphEntity, 'data'>>();

    if (!result) return [null, tx];

    return [{ id, ...result }, tx];
  }

  public async store(data: GraphEntity['data']): Promise<GraphEntity> {
    const entity: GraphEntity = {
      id: this.ulid(),
      data,
    };

    await this.query().insert(entity);

    return entity;
  }

  public async updateTx(
    tx: Knex.Transaction,
    graph: GraphEntity,
  ): Promise<void> {
    await this.query()
      .update({ data: graph.data })
      .where({ id: graph.id })
      .transacting(tx);
  }

  public delete(id: string): Promise<number> {
    return this.query().where({ id }).del();
  }
}
