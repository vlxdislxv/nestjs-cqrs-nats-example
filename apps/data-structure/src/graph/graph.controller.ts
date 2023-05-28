import { ParseULIDPipe } from '@dsa/common';
import {
  CommandMessagePattern,
  ExecutionResultSchema,
  QueryMessagePattern,
  RpcResponseSchema,
  RpcSchema,
} from '@dsa/nats';
import {
  CreateGraphDto,
  CreateGraphDtoSchema,
  EdgeDto,
  EdgeDtoSchema,
  FsDto,
  FsDtoSchema,
  GraphDtoArraySchema,
  GraphDtoSchema,
  SearchResultDtoSchema,
  VertexDto,
  VertexDtoSchema,
} from '@dsa/nats/services/graph/dto';
import { DsGraphRpcTopic } from '@dsa/nats/services/graph/topics';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { appConfig } from '../config';
import {
  AddEdgeCommand,
  AddVertexCommand,
  CreateGraphCommand,
  DeleteEdgeCommand,
  DeleteGraphCommand,
  DeleteVertexCommand,
} from './commands/impl';
import {
  FsGraphQuery,
  GetAllGraphsQuery,
  GetOneGraphQuery,
} from './queries/impl';

const { cqstype } = appConfig();

@Controller('graphs')
export class GraphController {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @QueryMessagePattern(DsGraphRpcTopic.GET_ALL, cqstype)
  @RpcResponseSchema(GraphDtoArraySchema)
  public getAll() {
    return this.queryBus.execute(new GetAllGraphsQuery());
  }

  @QueryMessagePattern(DsGraphRpcTopic.GET_ONE, cqstype)
  @RpcResponseSchema(GraphDtoSchema)
  public getOne(@Payload(ParseULIDPipe) id: string) {
    return this.queryBus.execute(new GetOneGraphQuery(id));
  }

  @QueryMessagePattern(DsGraphRpcTopic.FS, cqstype)
  @RpcSchema(FsDtoSchema, SearchResultDtoSchema)
  public fs(@Payload() dto: FsDto) {
    return this.queryBus.execute(
      new FsGraphQuery(dto.graphId, dto.source, dto.destination, dto.engine),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.CREATE, cqstype)
  @RpcSchema(CreateGraphDtoSchema, GraphDtoSchema)
  public create(@Payload() dto: CreateGraphDto) {
    return this.commandBus.execute(new CreateGraphCommand(dto.nodes));
  }

  @CommandMessagePattern(DsGraphRpcTopic.DELETE, cqstype)
  @RpcResponseSchema(ExecutionResultSchema)
  public delete(@Payload(ParseULIDPipe) id: string) {
    return this.commandBus.execute(new DeleteGraphCommand(id));
  }

  @CommandMessagePattern(DsGraphRpcTopic.ADD_VERTEX, cqstype)
  @RpcSchema(VertexDtoSchema, GraphDtoSchema)
  public addVertex(@Payload() dto: VertexDto) {
    return this.commandBus.execute(
      new AddVertexCommand(dto.graphId, dto.value),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.ADD_EDGE, cqstype)
  @RpcSchema(EdgeDtoSchema, GraphDtoSchema)
  public addEdge(@Payload() dto: EdgeDto) {
    return this.commandBus.execute(
      new AddEdgeCommand(dto.graphId, dto.source, dto.destination),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.DELETE_VERTEX, cqstype)
  @RpcSchema(VertexDtoSchema, GraphDtoSchema)
  public deleteVertex(@Payload() dto: VertexDto) {
    return this.commandBus.execute(
      new DeleteVertexCommand(dto.graphId, dto.value),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.DELETE_EDGE, cqstype)
  @RpcSchema(EdgeDtoSchema, GraphDtoSchema)
  public deleteEdge(@Payload() dto: EdgeDto) {
    return this.commandBus.execute(
      new DeleteEdgeCommand(dto.graphId, dto.source, dto.destination),
    );
  }
}
