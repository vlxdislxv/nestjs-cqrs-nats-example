import { RpcException } from '@nestjs/microservices';

export class NotFoundRpcException extends RpcException {
  public constructor(message = 'Entity not Found.') {
    super({
      statusCode: 404,
      message,
      error: 'Not Found',
    });
  }
}
