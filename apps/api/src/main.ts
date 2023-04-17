import { RpcExceptionFilter } from '@dsa/nats';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfig } from './config';

function setupDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('DSA')
    .setDescription('The DSA API.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const { http, swagger } = appConfig();
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  if (swagger) setupDoc(app);

  await app
    .useGlobalFilters(new RpcExceptionFilter())
    .listen(http.port, http.host);
}

bootstrap();
