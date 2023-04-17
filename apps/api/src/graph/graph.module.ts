import { GraphClientModule } from '@dsa/nats/services/graph';
import { Module } from '@nestjs/common';
import { GraphController } from './graph.controller';

@Module({
  imports: [GraphClientModule],
  controllers: [GraphController],
})
export class GraphModule {}
