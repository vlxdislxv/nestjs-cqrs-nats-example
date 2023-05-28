import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { AddVertexCommand } from '../impl';

@CommandHandler(AddVertexCommand)
export class AddVertexHandler implements ICommandHandler<AddVertexCommand> {
  public constructor(private readonly service: GraphService) {}

  public async execute(command: AddVertexCommand) {
    return this.service.addVertex(command);
  }
}
