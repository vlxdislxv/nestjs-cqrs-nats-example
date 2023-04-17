import { PostgresConfig } from '@dsa/common';
import { FactoryProvider, Module, ValueProvider } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Module({})
export class KnexModule {
  public static register(config: PostgresConfig) {
    const KnexClient: ValueProvider = {
      provide: 'KnexClient',
      useValue: knex({
        client: 'postgres',
        connection: config,
      }),
    };

    const ConnectionDestroyer: FactoryProvider = {
      provide: 'KnexClientDestroyer',
      useFactory(client: Knex) {
        return {
          onModuleDestroy: async () => {
            await client.destroy();
          },
        };
      },
      inject: [KnexClient.provide],
    };

    return {
      global: true,
      module: KnexModule,
      providers: [KnexClient, ConnectionDestroyer],
      exports: [KnexClient],
    };
  }
}
