import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter {
  public catch(exception: RpcException, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const error = exception.getError();
      throw new HttpException(error['message'], error['statusCode']);
    }

    throw exception.getError();
  }
}
