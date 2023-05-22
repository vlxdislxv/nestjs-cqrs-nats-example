import { FvCompileSync } from '@dsa/common';

export type EdgeDto = {
  graphId: string;
  source: string;
  destination: string;
};

export const EdgeDtoSchema = FvCompileSync<EdgeDto>({
  graphId: 'string|alphanum|uppercase|length:26',
  source: 'string|alpha|lowercase|max:15',
  destination: 'string|alpha|lowercase|max:15',
});
