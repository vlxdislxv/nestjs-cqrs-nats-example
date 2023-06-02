import { SvcException } from './svc.exception';

export class NotFoundSvcException extends SvcException {
  public constructor(message = 'Entity not Found.') {
    super({
      statusCode: 404,
      message,
      error: 'Not Found',
    });
  }
}
