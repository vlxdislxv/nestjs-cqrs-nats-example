import { ValidationPipe } from '@dsa/common';
import { Injectable } from '@nestjs/common';
import type { ValidationError } from 'fastest-validator';
import { BadRequestRpcException } from '../exceptions';

@Injectable()
export class RpcValidationPipe extends ValidationPipe {
  protected fail(errs: ValidationError[]): void {
    throw new BadRequestRpcException(errs);
  }
}
