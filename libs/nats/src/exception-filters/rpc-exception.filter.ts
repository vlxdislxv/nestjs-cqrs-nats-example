import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter {
  public catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError();

    if (host.getType() === 'http') {
      throw new HttpException(error, error['statusCode']);
    }

    throw error;
  }
}
