import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { CreateGraphCommand } from '../impl';

@CommandHandler(CreateGraphCommand)
export class CreateGraphHandler implements ICommandHandler<CreateGraphCommand> {
  public constructor(private readonly service: GraphService) {}

  public execute(command: CreateGraphCommand) {
    return this.service.create(command);
  }
}
