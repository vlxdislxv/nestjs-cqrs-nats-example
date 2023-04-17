import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { GraphEntity } from '../../types';
import { CreateGraphCommand } from '../impl';

@CommandHandler(CreateGraphCommand)
export class CreateGraphHandler
  extends GraphCQ
  implements ICommandHandler<CreateGraphCommand>
{
  public execute(command: CreateGraphCommand) {
    const data = command.nodes.reduce(
      (data, node) => ({
        ...data,
        [node]: [] as string[],
      }),
      {} as GraphEntity['data'],
    );

    return this.repo.store(data);
  }
}
