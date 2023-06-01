import { FsEngineEnum } from '@dsa/svc/graph';

export type FsGraphSvcDto = {
  graphId: string;
  source: string;
  destination: string;
  engine: FsEngineEnum;
};
