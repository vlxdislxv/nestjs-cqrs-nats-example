import { GraphData } from '@dsa/nats/services/graph/dto';

export type FsRunData = {
  source: string;
  destination: string;
  graph: GraphData;
};
