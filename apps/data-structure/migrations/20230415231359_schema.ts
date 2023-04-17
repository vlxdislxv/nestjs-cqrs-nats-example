import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('graphs', (qb) => {
    qb.string('id', 26).primary();
    qb.jsonb('data').defaultTo({});
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('graphs');
}
