import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { DeleteVertexCommand } from '../impl';

@CommandHandler(DeleteVertexCommand)
export class DeleteVertexHandler
  implements ICommandHandler<DeleteVertexCommand>
{
  public constructor(private readonly service: GraphService) {}

  public async execute(command: DeleteVertexCommand) {
    return this.service.deleteVertex(command);
  }
}
