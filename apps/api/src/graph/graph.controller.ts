import { ParseULIDPipe, ResponseSchema, Schema } from '@dsa/common';
import { GraphClientService } from '@dsa/nats/services/graph';
import {
  CreateGraphDtoSchema,
  GraphDtoArraySchema,
  GraphDtoSchema,
  SearchResultDtoSchema,
} from '@dsa/nats/services/graph/dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateGraphDto,
  EdgeDto,
  EdgeDtoSchema,
  VertexDto,
  VertexDtoSchema,
} from './dto/request';
import { GraphDto, SearchResultDto } from './dto/response';

@ApiTags('graphs')
@Controller('graphs')
export class GraphController {
  public constructor(private readonly service: GraphClientService) {}

  @Get()
  @ApiOkResponse({ type: [GraphDto] })
  @ResponseSchema(GraphDtoArraySchema)
  public getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GraphDto })
  @ResponseSchema(GraphDtoSchema)
  public getOne(@Param('id', ParseULIDPipe) id: string) {
    return this.service.getOne(id);
  }

  @Get(':id/bfs')
  @ApiOkResponse({ type: SearchResultDto })
  @Schema(EdgeDtoSchema, SearchResultDtoSchema)
  public bfs(@Param('id', ParseULIDPipe) id: string, @Query() query: EdgeDto) {
    return this.service.bfs({
      ...query,
      graphId: id,
    });
  }

  @Get(':id/dfs')
  @ApiOkResponse({ type: SearchResultDto })
  @Schema(EdgeDtoSchema, SearchResultDtoSchema)
  public dfs(@Param('id', ParseULIDPipe) id: string, @Query() query: EdgeDto) {
    return this.service.dfs({
      ...query,
      graphId: id,
    });
  }

  @Post()
  @ApiCreatedResponse({ type: GraphDto })
  @Schema(CreateGraphDtoSchema, GraphDtoSchema)
  public create(@Body() dto: CreateGraphDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @ApiOkResponse()
  public delete(@Param('id', ParseULIDPipe) id: string) {
    return this.service.delete(id);
  }

  @Post(':id/vertices')
  @ApiCreatedResponse({ type: GraphDto })
  @Schema(VertexDtoSchema, GraphDtoSchema)
  public addVertex(
    @Param('id', ParseULIDPipe) id: string,
    @Body() dto: VertexDto,
  ) {
    return this.service.addVertex({
      ...dto,
      graphId: id,
    });
  }

  @Post(':id/edges')
  @ApiCreatedResponse({ type: GraphDto })
  @Schema(EdgeDtoSchema, GraphDtoSchema)
  public addEdge(@Param('id', ParseULIDPipe) id: string, @Body() dto: EdgeDto) {
    return this.service.addEdge({
      ...dto,
      graphId: id,
    });
  }

  @Delete(':id/vertices')
  @ApiCreatedResponse({ type: GraphDto })
  @Schema(VertexDtoSchema, GraphDtoSchema)
  public deleteVertex(
    @Param('id', ParseULIDPipe) id: string,
    @Body() dto: VertexDto,
  ) {
    return this.service.deleteVertex({
      ...dto,
      graphId: id,
    });
  }

  @Delete(':id/edges')
  @ApiOkResponse({ type: GraphDto })
  @Schema(EdgeDtoSchema, GraphDtoSchema)
  public deleteEdge(
    @Param('id', ParseULIDPipe) id: string,
    @Body() dto: EdgeDto,
  ) {
    return this.service.deleteEdge({
      ...dto,
      graphId: id,
    });
  }
}
