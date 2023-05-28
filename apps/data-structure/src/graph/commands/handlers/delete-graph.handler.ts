import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { DeleteGraphCommand } from '../impl';

@CommandHandler(DeleteGraphCommand)
export class DeleteGraphHandler implements ICommandHandler<DeleteGraphCommand> {
  public constructor(private readonly service: GraphService) {}

  public execute(command: DeleteGraphCommand) {
    return this.service.delete(command);
  }
}
