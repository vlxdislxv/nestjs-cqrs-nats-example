import { SerializeInterceptor } from '@dsa/common';
import { NatsClientModule } from '@dsa/nats';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { appConfig } from './config';
import { GraphModule } from './graph';

@Module({
  imports: [NatsClientModule.register(appConfig().nats), GraphModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,
    },
  ],
})
export class AppModule {}
