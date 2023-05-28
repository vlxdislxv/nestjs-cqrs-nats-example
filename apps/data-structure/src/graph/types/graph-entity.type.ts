import { GraphData } from '@dsa/nats/services/graph/dto';

export type GraphEntity = {
  id: string;
  data: GraphData;
};
