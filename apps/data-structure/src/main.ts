import { SvcExceptionFilter } from '@dsa/svc';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { nkeyAuthenticator } from 'nats';
import { AppModule } from './app.module';
import { appConfig } from './config';

async function bootstrap() {
  const { nats } = appConfig();

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: nats.servers,
      authenticator: nkeyAuthenticator(new TextEncoder().encode(nats.secret)),
    },
  });

  await app.useGlobalFilters(new SvcExceptionFilter()).listen();
}
bootstrap();
