import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { DeleteGraphCommand } from '../impl';

@CommandHandler(DeleteGraphCommand)
export class DeleteGraphHandler
  extends GraphCQ
  implements ICommandHandler<DeleteGraphCommand>
{
  public async execute(command: DeleteGraphCommand) {
    await this.repo.delete(command.id);
    return true;
  }
}
