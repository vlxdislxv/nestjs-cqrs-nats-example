import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GraphService } from '../../graph.service';
import { FsGraphQuery } from '../impl';

@QueryHandler(FsGraphQuery)
export class FsGraphHandler implements IQueryHandler<FsGraphQuery> {
  public constructor(private readonly service: GraphService) {}

  public execute(query: FsGraphQuery) {
    return this.service.fs(query);
  }
}
