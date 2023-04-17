import { BadRequestRpcException } from './bad-request.rpc.exception';

export class NotFoundRpcException extends BadRequestRpcException {
  public constructor(message = 'Not Found.') {
    super(404, message);
  }
}
