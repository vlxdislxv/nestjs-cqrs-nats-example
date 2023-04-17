import { NotFoundRpcException } from '@dsa/nats';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { DeleteGraphCommand } from '../impl';

@CommandHandler(DeleteGraphCommand)
export class DeleteGraphHandler
  extends GraphCQ
  implements ICommandHandler<DeleteGraphCommand>
{
  public async execute(command: DeleteGraphCommand) {
    const raws = await this.repo.delete(command.id);
    if (!raws) throw new NotFoundRpcException();
    return true;
  }
}
