import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationError } from 'fastest-validator';
import { CheckFunction, isFailed } from '../validator';

@Injectable()
export abstract class ValidationPipe implements PipeTransform<any> {
  public constructor(private readonly check: CheckFunction) {}

  public async transform(value: any, { type }: ArgumentMetadata) {
    if (type === 'param') return value;

    const result = await this.check(value);
    if (isFailed(result)) {
      this.fail(result);
    }

    return value;
  }

  protected abstract fail(err: ValidationError[]): void;
}
