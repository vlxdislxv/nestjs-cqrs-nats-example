import { ParseULIDPipe, ResponseSchema, Schema } from '@dsa/common';
import {
  CommandMessagePattern,
  ExecutionResultSchema,
  QueryMessagePattern,
} from '@dsa/nats';
import {
  CreateGraphDto,
  CreateGraphDtoSchema,
  EdgeDto,
  EdgeDtoSchema,
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
  BfsGraphQuery,
  DfsGraphQuery,
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
  @ResponseSchema(GraphDtoArraySchema)
  public getAll() {
    return this.queryBus.execute(new GetAllGraphsQuery());
  }

  @QueryMessagePattern(DsGraphRpcTopic.GET_ONE, cqstype)
  @ResponseSchema(GraphDtoSchema)
  public getOne(@Payload(ParseULIDPipe) id: string) {
    return this.queryBus.execute(new GetOneGraphQuery(id));
  }

  @QueryMessagePattern(DsGraphRpcTopic.BFS, cqstype)
  @Schema(EdgeDtoSchema, SearchResultDtoSchema)
  public bfs(@Payload() dto: EdgeDto) {
    return this.queryBus.execute(
      new BfsGraphQuery(dto.graphId, dto.source, dto.destination),
    );
  }

  @QueryMessagePattern(DsGraphRpcTopic.DFS, cqstype)
  @Schema(EdgeDtoSchema, SearchResultDtoSchema)
  public dfs(@Payload() dto: EdgeDto) {
    return this.queryBus.execute(
      new DfsGraphQuery(dto.graphId, dto.source, dto.destination),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.CREATE, cqstype)
  @Schema(CreateGraphDtoSchema, GraphDtoSchema)
  public create(@Payload() dto: CreateGraphDto) {
    return this.commandBus.execute(new CreateGraphCommand(dto.nodes));
  }

  @CommandMessagePattern(DsGraphRpcTopic.DELETE, cqstype)
  @ResponseSchema(ExecutionResultSchema)
  public delete(@Payload(ParseULIDPipe) id: string) {
    return this.commandBus.execute(new DeleteGraphCommand(id));
  }

  @CommandMessagePattern(DsGraphRpcTopic.ADD_VERTEX, cqstype)
  @Schema(VertexDtoSchema, GraphDtoSchema)
  public addVertex(@Payload() dto: VertexDto) {
    return this.commandBus.execute(
      new AddVertexCommand(dto.graphId, dto.value),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.ADD_EDGE, cqstype)
  @Schema(EdgeDtoSchema, GraphDtoSchema)
  public addEdge(@Payload() dto: EdgeDto) {
    return this.commandBus.execute(
      new AddEdgeCommand(dto.graphId, dto.source, dto.destination),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.DELETE_VERTEX, cqstype)
  @Schema(VertexDtoSchema, GraphDtoSchema)
  public deleteVertex(@Payload() dto: VertexDto) {
    return this.commandBus.execute(
      new DeleteVertexCommand(dto.graphId, dto.value),
    );
  }

  @CommandMessagePattern(DsGraphRpcTopic.DELETE_EDGE, cqstype)
  @Schema(EdgeDtoSchema, GraphDtoSchema)
  public deleteEdge(@Payload() dto: EdgeDto) {
    return this.commandBus.execute(
      new DeleteEdgeCommand(dto.graphId, dto.source, dto.destination),
    );
  }
}
