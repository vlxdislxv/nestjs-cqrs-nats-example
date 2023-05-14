import { SetMetadata, UsePipes, applyDecorators } from '@nestjs/common';
import { RESPONSE_SCHEMA_KEY } from '../interceptors';
import { HttpValidationPipe } from '../pipes';
import { CheckFunction } from '../validator';

export function HttpSchema(request: CheckFunction, response: CheckFunction) {
  return applyDecorators(
    UsePipes(new HttpValidationPipe(request)),
    SetMetadata(RESPONSE_SCHEMA_KEY, response),
  );
}

export function HttpRequestSchema(request: CheckFunction) {
  return applyDecorators(UsePipes(new HttpValidationPipe(request)));
}

export function HttpResponseSchema(response: CheckFunction) {
  return applyDecorators(SetMetadata(RESPONSE_SCHEMA_KEY, response));
}
