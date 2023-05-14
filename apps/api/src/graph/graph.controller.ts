import { HttpResponseSchema, HttpSchema, ParseULIDPipe } from '@dsa/common';
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
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @HttpResponseSchema(GraphDtoArraySchema)
  public getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GraphDto })
  @HttpResponseSchema(GraphDtoSchema)
  public getOne(@Param('id', ParseULIDPipe) id: string) {
    return this.service.getOne(id);
  }

  @Get(':id/bfs')
  @ApiOkResponse({ type: SearchResultDto })
  @HttpSchema(EdgeDtoSchema, SearchResultDtoSchema)
  public bfs(@Param('id', ParseULIDPipe) id: string, @Query() query: EdgeDto) {
    return this.service.bfs({
      ...query,
      graphId: id,
    });
  }

  @Get(':id/dfs')
  @ApiOkResponse({ type: SearchResultDto })
  @HttpSchema(EdgeDtoSchema, SearchResultDtoSchema)
  public dfs(@Param('id', ParseULIDPipe) id: string, @Query() query: EdgeDto) {
    return this.service.dfs({
      ...query,
      graphId: id,
    });
  }

  @Post()
  @ApiCreatedResponse({ type: GraphDto })
  @HttpSchema(CreateGraphDtoSchema, GraphDtoSchema)
  public create(@Body() dto: CreateGraphDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', ParseULIDPipe) id: string) {
    await this.service.delete(id);
  }

  @Post(':id/vertices')
  @ApiCreatedResponse({ type: GraphDto })
  @HttpSchema(VertexDtoSchema, GraphDtoSchema)
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
  @HttpSchema(EdgeDtoSchema, GraphDtoSchema)
  public addEdge(@Param('id', ParseULIDPipe) id: string, @Body() dto: EdgeDto) {
    return this.service.addEdge({
      ...dto,
      graphId: id,
    });
  }

  @Delete(':id/vertices')
  @ApiCreatedResponse({ type: GraphDto })
  @HttpSchema(VertexDtoSchema, GraphDtoSchema)
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
  @HttpSchema(EdgeDtoSchema, GraphDtoSchema)
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
