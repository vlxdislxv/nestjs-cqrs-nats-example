import { FvCompileSync } from '@dsa/common';

export type CreateGraphDto = {
  nodes: string[];
};

export const CreateGraphDtoSchema = FvCompileSync<CreateGraphDto>({
  nodes: { type: 'array', items: 'string|alpha|lowercase|max:15' },
});
