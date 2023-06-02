import { SvcException } from './svc.exception';

export class BadRequestSvcException extends SvcException {
  public constructor(message: any) {
    super({
      statusCode: 400,
      message,
      error: 'Bad Request',
    });
  }
}
