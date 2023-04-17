import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  main: {
    client: 'postgresql',
    connection: {
      database: 'data_structure',
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      port: parseInt(process.env.POSTGRES_PORT || '5632'),
      user: process.env.POSTGRES_USER || 'dsa',
      password: process.env.POSTGRES_PASSWORD || 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
