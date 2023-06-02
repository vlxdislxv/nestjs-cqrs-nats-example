import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { SvcException } from '../exceptions';

@Catch(SvcException)
export class SvcExceptionFilter {
  public catch(exception: SvcException, host: ArgumentsHost) {
    const error = exception.getError();

    if (host.getType() === 'http') {
      throw new HttpException(error, error['statusCode']);
    }

    throw error;
  }
}
