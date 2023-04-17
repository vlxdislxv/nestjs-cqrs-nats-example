import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { AddVertexCommand } from '../impl';

@CommandHandler(AddVertexCommand)
export class AddVertexHandler
  extends GraphCQ
  implements ICommandHandler<AddVertexCommand>
{
  public async execute(command: AddVertexCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);

    this.addVertex(graph, command.value);

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }
}
