import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GraphCQ } from '../../base';
import { GetAllGraphsQuery } from '../impl';

@QueryHandler(GetAllGraphsQuery)
export class GetAllGraphsHandler
  extends GraphCQ
  implements IQueryHandler<GetAllGraphsQuery>
{
  public execute() {
    return this.repo.findAll();
  }
}
