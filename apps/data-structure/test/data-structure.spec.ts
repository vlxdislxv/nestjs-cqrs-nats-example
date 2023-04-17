import { SerializeInterceptor } from '@dsa/common';
import { KnexModule } from '@dsa/knex';
import { ClientProxyAdapter, NatsClientModule } from '@dsa/nats';
import {
  GraphClientModule,
  GraphClientService,
} from '@dsa/nats/services/graph';
import { GraphDto } from '@dsa/nats/services/graph/dto';
import { INestMicroservice } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { nkeyAuthenticator } from 'nats';
import { appConfig } from '../src/config';
import { GraphModule } from '../src/graph';

jest.setTimeout(30000);

describe('data-structure service (e2e)', () => {
  let app: INestMicroservice;
  let client: GraphClientService;

  let testGraph: GraphDto;

  beforeAll(async () => {
    const { postgres, nats } = appConfig();

    const moduleRef = await Test.createTestingModule({
      imports: [
        GraphModule,
        KnexModule.register(postgres),
        NatsClientModule.register(nats),
        GraphClientModule,
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: SerializeInterceptor,
        },
      ],
    }).compile();

    app = moduleRef.createNestMicroservice({
      transport: Transport.NATS,
      options: {
        servers: nats.servers,
        authenticator: nkeyAuthenticator(new TextEncoder().encode(nats.secret)),
      },
    });

    client = moduleRef.get<GraphClientService>(GraphClientService);

    await app.listen();
    await app.get<ClientProxyAdapter>(ClientProxyAdapter).connect();
  });

  it('graph.create (COMMAND)', async () => {
    const nodes = ['a', 'b', 'c', 'd'];

    testGraph = await client.create({ nodes });

    const storedNodes = Object.keys(testGraph.data);
    const condition = expect.arrayContaining(nodes);

    expect(storedNodes).toEqual(condition);
  });

  it('graph.getAll (QUERY)', async () => {
    const graphs = await client.getAll();
    const condition = expect.arrayContaining([testGraph]);

    expect(graphs).toEqual(condition);
  });

  it('graph.getOne (QUERY)', async () => {
    const graph = await client.getOne(testGraph.id);
    expect(graph).toEqual(testGraph);

    const notFound: RpcException = await client
      .getOne('00000000000000000000000000')
      .catch((err) => err);

    expect(notFound.getError()).toEqual({
      type: 'BadRequestRpcException',
      statusCode: 404,
      message: 'Not Found.',
    });
  });

  it('graph.addVertex (COMMAND)', async () => {
    testGraph = await client.addVertex({
      graphId: testGraph.id,
      value: 'd',
    });

    expect(testGraph.data['d']).toEqual([]);
  });

  it('graph.addEdge (COMMAND)', async () => {
    testGraph = await client.addEdge({
      graphId: testGraph.id,
      source: 'a',
      destination: 'b',
    });

    testGraph = await client.addEdge({
      graphId: testGraph.id,
      source: 'a',
      destination: 'd',
    });

    testGraph = await client.addEdge({
      graphId: testGraph.id,
      source: 'b',
      destination: 'c',
    });

    expect(testGraph.data['a']).toEqual(['b', 'd']);
    expect(testGraph.data['b']).toEqual(['c']);
  });

  it('graph.bfs (QUERY)', async () => {
    const result = await client.bfs({
      graphId: testGraph.id,
      source: 'a',
      destination: 'c',
    });

    expect(result.path).toEqual(['a', 'b', 'c']);
    expect(result.iterations).toEqual(2);
  });

  it('graph.dfs (QUERY)', async () => {
    const result = await client.dfs({
      graphId: testGraph.id,
      source: 'a',
      destination: 'c',
    });

    expect(result.path).toEqual(['a', 'b', 'c']);
    expect(result.iterations).toEqual(3);
  });

  it('graph.deleteEdge (COMMAND)', async () => {
    testGraph = await client.deleteEdge({
      graphId: testGraph.id,
      source: 'a',
      destination: 'd',
    });

    expect(testGraph.data['a']).toEqual(['b']);
  });

  it('graph.deleteVertex (COMMAND)', async () => {
    testGraph = await client.deleteVertex({
      graphId: testGraph.id,
      value: 'd',
    });

    expect(testGraph.data['d']).toEqual(undefined);
  });

  it('graph.delete (COMMAND)', async () => {
    const deleted = await client.delete(testGraph.id);

    expect(deleted).toEqual(true);
  });

  afterAll(() => app.close());
});
