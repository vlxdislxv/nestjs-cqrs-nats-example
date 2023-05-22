import { FvCompileSync } from '@dsa/common';

export type VertexDto = {
  graphId: string;
  value: string;
};

export const VertexDtoSchema = FvCompileSync<VertexDto>({
  graphId: 'string|alphanum|uppercase|length:26',
  value: 'string|alpha|lowercase|max:15',
});
