import { FsEngineEnum } from '@dsa/core/graph';

export type FsGraphSvcDto = {
  graphId: string;
  source: string;
  destination: string;
  engine: FsEngineEnum;
};
