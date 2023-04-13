import { ValidationError } from 'fastest-validator';

export function isFailed(
  result: true | ValidationError[] | Promise<true | ValidationError[]>,
): result is ValidationError[] {
  return result !== true;
}
