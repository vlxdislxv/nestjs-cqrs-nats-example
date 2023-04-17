import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CheckFunction, isFailed } from '../validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  public constructor(private readonly check: CheckFunction) {}

  public async transform(value: any, { type }: ArgumentMetadata) {
    if (type === 'param') return value;

    const result = await this.check(value);
    if (isFailed(result)) {
      throw new BadRequestException(result);
    }

    return value;
  }
}
