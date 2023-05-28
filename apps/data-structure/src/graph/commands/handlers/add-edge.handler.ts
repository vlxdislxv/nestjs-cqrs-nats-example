import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { AddEdgeCommand } from '../impl';

@CommandHandler(AddEdgeCommand)
export class AddEdgeHandler implements ICommandHandler<AddEdgeCommand> {
  public constructor(private readonly service: GraphService) {}

  public async execute(command: AddEdgeCommand) {
    return this.service.addEdge(command);
  }
}
