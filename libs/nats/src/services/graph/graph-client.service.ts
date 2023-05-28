import { Injectable } from '@nestjs/common';
import { ClientProxyAdapter } from '../../client';
import {
  CreateGraphDto,
  EdgeDto,
  FsDto,
  GraphDto,
  SearchResultDto,
  VertexDto,
} from './dto';
import { DsGraphRpcTopic } from './topics';

@Injectable()
export class GraphClientService {
  public constructor(private readonly client: ClientProxyAdapter) {}

  public getAll() {
    return this.client.request<null, GraphDto[]>(DsGraphRpcTopic.GET_ALL);
  }

  public getOne(id: string) {
    return this.client.request<string, GraphDto>(DsGraphRpcTopic.GET_ONE, id);
  }

  public fs(dto: FsDto) {
    return this.client.request<FsDto, SearchResultDto>(DsGraphRpcTopic.FS, dto);
  }

  public create(dto: CreateGraphDto) {
    return this.client.request<CreateGraphDto, GraphDto>(
      DsGraphRpcTopic.CREATE,
      dto,
    );
  }

  public delete(id: string) {
    return this.client.request<string, boolean>(DsGraphRpcTopic.DELETE, id);
  }

  public addVertex(dto: VertexDto) {
    return this.client.request<VertexDto, GraphDto>(
      DsGraphRpcTopic.ADD_VERTEX,
      dto,
    );
  }

  public addEdge(dto: EdgeDto) {
    return this.client.request<EdgeDto, GraphDto>(
      DsGraphRpcTopic.ADD_EDGE,
      dto,
    );
  }

  public deleteVertex(dto: VertexDto) {
    return this.client.request<VertexDto, GraphDto>(
      DsGraphRpcTopic.DELETE_VERTEX,
      dto,
    );
  }

  public deleteEdge(dto: EdgeDto) {
    return this.client.request<EdgeDto, GraphDto>(
      DsGraphRpcTopic.DELETE_EDGE,
      dto,
    );
  }
}
