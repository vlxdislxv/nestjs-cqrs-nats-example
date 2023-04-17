import { AddEdgeHandler } from './add-edge.handler';
import { AddVertexHandler } from './add-vertex.handler';
import { CreateGraphHandler } from './create-graph.handler';
import { DeleteEdgeHandler } from './delete-edge.handler';
import { DeleteGraphHandler } from './delete-graph.handler';
import { DeleteVertexHandler } from './delete-vertex.handler';

export const CommandHandlers = [
  AddEdgeHandler,
  AddVertexHandler,
  CreateGraphHandler,
  DeleteEdgeHandler,
  DeleteGraphHandler,
  DeleteVertexHandler,
];
