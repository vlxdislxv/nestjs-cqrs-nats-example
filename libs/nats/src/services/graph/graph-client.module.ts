import { Module } from '@nestjs/common';
import { GraphClientService } from './graph-client.service';

@Module({
  providers: [GraphClientService],
  exports: [GraphClientService],
})
export class GraphClientModule {}
