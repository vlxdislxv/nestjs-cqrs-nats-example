import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { GetOneGraphQuery } from '../impl';

@QueryHandler(GetOneGraphQuery)
export class GetOneGraphHandler implements IQueryHandler<GetOneGraphQuery> {
  public constructor(private readonly service: GraphService) {}

  public execute(query: GetOneGraphQuery) {
    return this.service.getById(query.id);
  }
}
