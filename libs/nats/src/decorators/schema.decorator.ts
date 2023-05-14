import { CheckFunction, RESPONSE_SCHEMA_KEY } from '@dsa/common';
import { SetMetadata, UsePipes, applyDecorators } from '@nestjs/common';
import { RpcValidationPipe } from '../pipes';

export function RpcSchema(request: CheckFunction, response: CheckFunction) {
  return applyDecorators(
    UsePipes(new RpcValidationPipe(request)),
    SetMetadata(RESPONSE_SCHEMA_KEY, response),
  );
}

export function RpcRequestSchema(request: CheckFunction) {
  return applyDecorators(UsePipes(new RpcValidationPipe(request)));
}

export function RpcResponseSchema(response: CheckFunction) {
  return applyDecorators(SetMetadata(RESPONSE_SCHEMA_KEY, response));
}
