import { fv } from '@dsa/common';

export const ExecutionResultSchema = fv.compile({
  $$root: true,
  type: 'boolean',
});
