import { NatsConfig } from '@dsa/common';
import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { nkeyAuthenticator } from 'nats';
import { ClientProxyAdapter } from './client-proxy.adapter';

@Module({})
export class NatsClientModule {
  public static register(config: NatsConfig): DynamicModule {
    const ClientProxy: FactoryProvider = {
      provide: ClientProxyAdapter,
      useFactory: () => {
        const client = ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: config.servers,
            authenticator: nkeyAuthenticator(
              new TextEncoder().encode(config.secret),
            ),
          },
        });

        return new ClientProxyAdapter(client);
      },
    };

    return {
      global: true,
      module: NatsClientModule,
      providers: [ClientProxy],
      exports: [ClientProxy],
    };
  }
}
