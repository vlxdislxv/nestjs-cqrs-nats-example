import { SetMetadata, UsePipes, applyDecorators } from '@nestjs/common';
import { RESPONSE_SCHEMA_KEY } from '../interceptors';
import { ValidationPipe } from '../pipes';
import { CheckFunction } from '../validator';

export function Schema(request: CheckFunction, response: CheckFunction) {
  return applyDecorators(
    UsePipes(new ValidationPipe(request)),
    SetMetadata(RESPONSE_SCHEMA_KEY, response),
  );
}

export function RequestSchema(request: CheckFunction) {
  return applyDecorators(UsePipes(new ValidationPipe(request)));
}

export function ResponseSchema(response: CheckFunction) {
  return applyDecorators(SetMetadata(RESPONSE_SCHEMA_KEY, response));
}
