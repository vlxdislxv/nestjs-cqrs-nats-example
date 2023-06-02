import { BadRequestSvcException } from '@dsa/svc';
import { Injectable } from '@nestjs/common';
import type { ValidationError } from 'fastest-validator';
import { ValidationPipe } from './validation.pipe';

@Injectable()
export class RpcValidationPipe extends ValidationPipe {
  protected fail(errs: ValidationError[]): void {
    throw new BadRequestSvcException(errs);
  }
}
