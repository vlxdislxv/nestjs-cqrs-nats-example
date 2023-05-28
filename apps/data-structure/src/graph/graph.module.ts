import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { FsEnginesMapProvider } from './providers';
import { QueryHandlers } from './queries/handlers';
import { GraphRepository } from './repositories';

@Module({
  imports: [CqrsModule],
  controllers: [GraphController],
  providers: [
    GraphService,
    GraphRepository,
    FsEnginesMapProvider,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class GraphModule {}
