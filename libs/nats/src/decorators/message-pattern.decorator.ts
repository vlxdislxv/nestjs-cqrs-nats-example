import { CQServiceType } from '@dsa/common';
import { applyDecorators } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

export function QueryMessagePattern(topic: string, cqtype: CQServiceType) {
  if (cqtype === 'COMMAND') return applyDecorators();

  return applyDecorators(MessagePattern(topic));
}

export function CommandMessagePattern(topic: string, cqtype: CQServiceType) {
  if (cqtype === 'QUERY') return applyDecorators();

  return applyDecorators(MessagePattern(topic));
}
