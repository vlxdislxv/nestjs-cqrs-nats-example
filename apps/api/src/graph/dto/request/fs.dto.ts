import { FvCompileSync } from '@dsa/common';
import { FsEngineEnum } from '@dsa/svc/graph';
import { ApiProperty } from '@nestjs/swagger';

export class FsDto {
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

  @ApiProperty({
    enum: FsEngineEnum,
    description: 'Fs Engine.',
    example: FsEngineEnum.BREADTH,
  })
  engine: FsEngineEnum;
}

export const FsDtoSchema = FvCompileSync<FsDto>({
  source: 'string|alpha|lowercase|max:15',
  destination: 'string|alpha|lowercase|max:15',
  engine: { type: 'enum', values: Object.values(FsEngineEnum) },
});
