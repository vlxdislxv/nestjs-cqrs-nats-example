import { BfsGraphHandler } from './bfs-graph.handler';
import { DfsGraphHandler } from './dfs-graph.handler';
import { GetAllGraphsHandler } from './get-all-graphs.handler';
import { GetOneGraphHandler } from './get-one-graph.handler';

export const QueryHandlers = [
  BfsGraphHandler,
  DfsGraphHandler,
  GetAllGraphsHandler,
  GetOneGraphHandler,
];
