import { ApiProperty } from '@nestjs/swagger';

export class SearchResultDto {
  @ApiProperty({
    type: Array,
    description:
      'Path from source to destination node (Empty if path not found).',
    example: ['a', 'b', 'c'],
  })
  path: string[];

  @ApiProperty({
    type: Number,
    description: 'Amount of iterations.',
    example: 10,
  })
  iterations: number;
}
