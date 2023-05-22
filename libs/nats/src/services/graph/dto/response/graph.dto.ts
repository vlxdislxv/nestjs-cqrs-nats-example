import { FvCompileSync } from '@dsa/common';

export type GraphDto = {
  id: string;
  data: Record<string, string[]>;
};

export const GraphDtoSchema = FvCompileSync({
  id: 'string|alphanum|uppercase|length:26',
  data: {
    type: 'record',
    key: 'string|alpha|lowercase|max:15',
    value: { type: 'array', items: 'string|alpha|lowercase|max:15' },
  },
});

export const GraphDtoArraySchema = FvCompileSync({
  $$root: true,
  type: 'array',
  items: {
    type: 'object',
    props: {
      id: 'string|alphanum|uppercase|length:26',
      data: {
        type: 'record',
        key: 'string|alpha|lowercase|max:15',
        value: { type: 'array', items: 'string|alpha|lowercase|max:15' },
      },
    },
  },
});
