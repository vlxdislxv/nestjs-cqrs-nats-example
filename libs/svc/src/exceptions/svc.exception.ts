import { isObject, isString } from 'lodash';

export class SvcException extends Error {
  public constructor(private readonly error: string | object) {
    super();
    this.initMessage();
  }

  public getError() {
    return this.error;
  }

  private initMessage() {
    if (isString(this.error)) {
      this.message = this.error;
    } else if (
      isObject(this.error) &&
      isString((this.error as Record<string, any>).message)
    ) {
      this.message = (this.error as Record<string, any>).message;
    } else if (this.constructor) {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ');
    }
  }
}
