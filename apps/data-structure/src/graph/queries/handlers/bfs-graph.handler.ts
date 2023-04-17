import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FsGraphHandler } from '../../base';
import { LinkedNode } from '../../types';
import { BfsGraphQuery } from '../impl';

@QueryHandler(BfsGraphQuery)
export class BfsGraphHandler
  extends FsGraphHandler
  implements IQueryHandler<BfsGraphQuery>
{
  protected nextEl(queue: LinkedNode[]): LinkedNode {
    return queue.shift();
  }
}
