import { fv } from '@dsa/common';

export type CreateGraphDto = {
  nodes: string[];
};

export const CreateGraphDtoSchema = fv.compile<CreateGraphDto>({
  nodes: { type: 'array', items: 'string|alpha|lowercase|max:15' },
});
