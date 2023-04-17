import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { DeleteVertexCommand } from '../impl';

@CommandHandler(DeleteVertexCommand)
export class DeleteVertexHandler
  extends GraphCQ
  implements ICommandHandler<DeleteVertexCommand>
{
  public async execute(command: DeleteVertexCommand) {
    const { graph, tx } = await this.getByIdTx(command.graphId);

    if (graph.data[command.value]) {
      delete graph.data[command.value];

      for (const nodes of Object.values(graph.data)) {
        const index = nodes.indexOf(command.value);

        if (index !== -1) {
          nodes.splice(index, 1);
        }
      }

      await this.repo.updateTx(tx, graph);
      await tx.commit();
    } else {
      await tx.rollback();
    }

    return graph;
  }
}
