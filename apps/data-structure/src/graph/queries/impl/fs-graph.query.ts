import { FsEngineEnum } from '@dsa/core/graph';

export class FsGraphQuery {
  public constructor(
    public readonly graphId: string,
    public readonly source: string,
    public readonly destination: string,
    public readonly engine: FsEngineEnum,
  ) {}
}
