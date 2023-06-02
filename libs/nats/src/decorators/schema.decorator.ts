import { RESPONSE_SCHEMA_KEY, RpcValidationPipe } from '@dsa/common';
import { SetMetadata, UsePipes, applyDecorators } from '@nestjs/common';
import type { SyncCheckFunction } from 'fastest-validator';

export function RpcSchema(
  request: SyncCheckFunction,
  response: SyncCheckFunction,
) {
  return applyDecorators(
    UsePipes(new RpcValidationPipe(request)),
    SetMetadata(RESPONSE_SCHEMA_KEY, response),
  );
}

export function RpcRequestSchema(request: SyncCheckFunction) {
  return applyDecorators(UsePipes(new RpcValidationPipe(request)));
}

export function RpcResponseSchema(response: SyncCheckFunction) {
  return applyDecorators(SetMetadata(RESPONSE_SCHEMA_KEY, response));
}
