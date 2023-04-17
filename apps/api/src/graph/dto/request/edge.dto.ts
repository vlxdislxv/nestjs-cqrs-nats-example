import { fv } from '@dsa/common';
import { ApiProperty } from '@nestjs/swagger';

export class EdgeDto {
  @ApiProperty({
    type: String,
    description: 'Source Node.',
    example: 'a',
  })
  source: string;

  @ApiProperty({
    type: String,
    description: 'Destination Node.',
    example: 'b',
  })
  destination: string;
}

export const EdgeDtoSchema = fv.compile<EdgeDto>({
  source: 'string|alpha|lowercase|max:15',
  destination: 'string|alpha|lowercase|max:15',
});
