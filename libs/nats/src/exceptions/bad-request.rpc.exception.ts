import { RpcException } from '@nestjs/microservices';

export class BadRequestRpcException extends RpcException {
  public constructor(message: any) {
    super({
      statusCode: 400,
      message,
      error: 'Bad Request',
    });
  }
}
