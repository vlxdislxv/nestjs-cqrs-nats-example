import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { ulid } from 'ulid';

@Injectable()
export abstract class KnexRepository {
  protected abstract readonly table: string;

  public constructor(
    @Inject('KnexClient')
    protected readonly knex: Knex,
  ) {}

  protected ulid() {
    return ulid();
  }

  protected query() {
    return this.knex(this.table);
  }
}
