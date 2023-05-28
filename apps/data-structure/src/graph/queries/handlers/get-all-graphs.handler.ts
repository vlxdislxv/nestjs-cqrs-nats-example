import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { GetAllGraphsQuery } from '../impl';

@QueryHandler(GetAllGraphsQuery)
export class GetAllGraphsHandler implements IQueryHandler<GetAllGraphsQuery> {
  public constructor(private readonly service: GraphService) {}

  public execute() {
    return this.service.getAll();
  }
}
