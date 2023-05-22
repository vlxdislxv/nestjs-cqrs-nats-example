import { SetMetadata, UsePipes, applyDecorators } from '@nestjs/common';
import type { SyncCheckFunction } from 'fastest-validator';
import { RESPONSE_SCHEMA_KEY } from '../interceptors';
import { HttpValidationPipe } from '../pipes';

export function HttpSchema(
  request: SyncCheckFunction,
  response: SyncCheckFunction,
) {
  return applyDecorators(
    UsePipes(new HttpValidationPipe(request)),
    SetMetadata(RESPONSE_SCHEMA_KEY, response),
  );
}

export function HttpRequestSchema(request: SyncCheckFunction) {
  return applyDecorators(UsePipes(new HttpValidationPipe(request)));
}

export function HttpResponseSchema(response: SyncCheckFunction) {
  return applyDecorators(SetMetadata(RESPONSE_SCHEMA_KEY, response));
}
