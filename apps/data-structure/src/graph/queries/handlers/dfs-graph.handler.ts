import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FsGraphHandler } from '../../base';
import { LinkedNode } from '../../types';
import { DfsGraphQuery } from '../impl';

@QueryHandler(DfsGraphQuery)
export class DfsGraphHandler
  extends FsGraphHandler
  implements IQueryHandler<DfsGraphQuery>
{
  protected nextEl(queue: LinkedNode[]): LinkedNode {
    return queue.pop();
  }
}
