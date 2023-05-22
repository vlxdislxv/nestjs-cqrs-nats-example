import { FvCompileSync } from '@dsa/common';

export type SearchResultDto = {
  path: string[];
  iterations: number;
};

export const SearchResultDtoSchema = FvCompileSync<SearchResultDto>({
  iterations: 'number|positive',
  path: { type: 'array', items: 'string|alpha|lowercase|max:15' },
});
