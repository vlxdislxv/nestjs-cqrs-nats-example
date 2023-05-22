import { FvCompileSync } from '@dsa/common';
import { ApiProperty } from '@nestjs/swagger';

export class VertexDto {
  @ApiProperty({
    type: String,
    description: 'Vertex.',
    example: 'a',
  })
  value: string;
}

export const VertexDtoSchema = FvCompileSync<VertexDto>({
  value: 'string|alpha|lowercase|max:15',
});
