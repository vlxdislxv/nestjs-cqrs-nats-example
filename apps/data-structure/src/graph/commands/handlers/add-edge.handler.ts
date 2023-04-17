import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { AddEdgeCommand } from '../impl';

@CommandHandler(AddEdgeCommand)
export class AddEdgeHandler
  extends GraphCQ
  implements ICommandHandler<AddEdgeCommand>
{
  public async execute(command: AddEdgeCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);
    const srcNodes = this.addVertex(graph, command.source);

    this.addVertex(graph, command.destination);

    if (srcNodes.indexOf(command.destination) === -1) {
      srcNodes.push(command.destination);
    }

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }
}
