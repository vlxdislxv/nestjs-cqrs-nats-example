import {
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { FvCompileSync } from '../validator';

const check = FvCompileSync({
  $$root: true,
  type: 'string',
  alphanum: true,
  uppercase: true,
  length: 26,
});

@Injectable()
export class ParseULIDPipe implements PipeTransform<string> {
  public async transform(value: string): Promise<string> {
    if (check(value) !== true) {
      throw new NotAcceptableException('Validation failed (ULID is expected)');
    }

    return value;
  }
}
