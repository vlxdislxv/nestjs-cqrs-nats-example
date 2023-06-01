import { FvCompileSync } from '@dsa/common';
import { FsEngineEnum } from '@dsa/svc/graph';

export type FsDto = {
  graphId: string;
  source: string;
  destination: string;
  engine: FsEngineEnum;
};

export const FsDtoSchema = FvCompileSync<FsDto>({
  graphId: 'string|alphanum|uppercase|length:26',
  source: 'string|alpha|lowercase|max:15',
  destination: 'string|alpha|lowercase|max:15',
  engine: { type: 'enum', values: Object.values(FsEngineEnum) },
});
