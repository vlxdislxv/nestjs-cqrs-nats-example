import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { GetOneGraphQuery } from '../impl';

@QueryHandler(GetOneGraphQuery)
export class GetOneGraphHandler
  extends GraphCQ
  implements IQueryHandler<GetOneGraphQuery>
{
  public execute(query: GetOneGraphQuery) {
    return this.getById(query.id);
  }
}
