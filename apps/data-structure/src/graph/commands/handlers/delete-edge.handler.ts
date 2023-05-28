import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { DeleteEdgeCommand } from '../impl';

@CommandHandler(DeleteEdgeCommand)
export class DeleteEdgeHandler implements ICommandHandler<DeleteEdgeCommand> {
  public constructor(private readonly service: GraphService) {}

  public async execute(command: DeleteEdgeCommand) {
    return this.service.deleteEdge(command);
  }
}
