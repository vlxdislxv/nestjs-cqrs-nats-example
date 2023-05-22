import { BadRequestException, Injectable } from '@nestjs/common';
import type { ValidationError } from 'fastest-validator';
import { ValidationPipe } from './validation.pipe';

@Injectable()
export class HttpValidationPipe extends ValidationPipe {
  protected fail(errs: ValidationError[]): void {
    throw new BadRequestException(errs);
  }
}
