import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import type { SyncCheckFunction, ValidationError } from 'fastest-validator';

@Injectable()
export abstract class ValidationPipe implements PipeTransform<any> {
  public constructor(private readonly check: SyncCheckFunction) {}

  public async transform(value: any, { type }: ArgumentMetadata) {
    if (type === 'param') return value;

    const result = this.check(value);

    if (result !== true) {
      this.fail(result);
    }

    return value;
  }

  protected abstract fail(err: ValidationError[]): void;
}
