import { RpcException } from '@nestjs/microservices';

export class BadRequestRpcException extends RpcException {
  public constructor(statusCode: number, message: string) {
    super({ type: 'BadRequestRpcException', statusCode, message });
  }
}
