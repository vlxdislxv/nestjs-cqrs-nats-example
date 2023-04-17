import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { DeleteEdgeCommand } from '../impl';

@CommandHandler(DeleteEdgeCommand)
export class DeleteEdgeHandler
  extends GraphCQ
  implements ICommandHandler<DeleteEdgeCommand>
{
  public async execute(command: DeleteEdgeCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);
    const srcNodes = graph.data[command.source];

    if (!srcNodes) {
      await tx.rollback();
      return graph;
    }

    const index = srcNodes.indexOf(command.destination);

    if (index === -1) {
      await tx.rollback();
      return graph;
    }

    srcNodes.splice(index, 1);

    await this.repo.updateTx(tx, graph);
    await tx.commit();

    return graph;
  }
}
