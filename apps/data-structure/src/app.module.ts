import { SerializeInterceptor } from '@dsa/common';
import { KnexModule } from '@dsa/knex';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { appConfig } from './config';
import { GraphModule } from './graph';

@Module({
  imports: [GraphModule, KnexModule.register(appConfig().postgres)],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,
    },
  ],
})
export class AppModule {}
