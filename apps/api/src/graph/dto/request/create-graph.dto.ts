import { ApiProperty } from '@nestjs/swagger';

export class CreateGraphDto {
  @ApiProperty({
    type: Array,
    default: [],
    description: 'Graph Nodes.',
    example: ['a', 'b', 'c'],
  })
  nodes: string[];
}
