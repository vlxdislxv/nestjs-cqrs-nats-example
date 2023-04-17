import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { GraphController } from './graph.controller';
import { QueryHandlers } from './queries/handlers';
import { GraphRepository } from './repositories';

@Module({
  imports: [CqrsModule],
  controllers: [GraphController],
  providers: [...CommandHandlers, ...QueryHandlers, GraphRepository],
})
export class GraphModule {}
