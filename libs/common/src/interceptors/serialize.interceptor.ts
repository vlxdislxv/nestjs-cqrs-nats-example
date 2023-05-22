import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  PlainLiteralObject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { SyncCheckFunction } from 'fastest-validator';
import { Observable, map } from 'rxjs';

type ExecutionResult = PlainLiteralObject | Array<PlainLiteralObject>;

export const RESPONSE_SCHEMA_KEY = 'response:schema';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(SerializeInterceptor.name);

  public constructor(private readonly reflector: Reflector) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((res: ExecutionResult) => {
        return this.serialize(context, res);
      }),
    );
  }

  private serialize(context: ExecutionContext, res: ExecutionResult) {
    const check = this.reflector.get<SyncCheckFunction>(
      RESPONSE_SCHEMA_KEY,
      context.getHandler(),
    );

    if (check) {
      const result = check(res);

      if (result !== true) {
        const cls = context.getClass().name;
        const handler = context.getHandler().name;

        this.logger.warn(`Mismatch Schema: ${cls}.${handler}`, result);
      }
    }

    return res;
  }
}
