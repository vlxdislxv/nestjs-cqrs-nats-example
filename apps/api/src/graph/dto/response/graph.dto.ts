import { GraphData } from '@dsa/core/graph';
import { ApiProperty } from '@nestjs/swagger';

export class GraphDto {
  @ApiProperty({
    type: String,
    description: 'Graph Id.',
    example: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
  })
  id: string;

  @ApiProperty({
    type: Object,
    description: 'Graph Representation.',
    example: { a: ['b', 'c'], b: [], c: [] },
  })
  data: GraphData;
}
