import { SvcException } from '@dsa/svc';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class ClientProxyAdapter {
  public constructor(private readonly client: ClientProxy) {}

  public async request<Request, Response>(
    topic: string,
    data = {} as Request,
  ): Promise<Response> {
    try {
      return await firstValueFrom(this.client.send(topic, data));
    } catch (err) {
      const scode = err['statusCode'];

      if (scode >= 400 && scode < 500) {
        throw new SvcException(err);
      }

      err.message += ` | RpcTopic:${topic}`;

      throw err;
    }
  }

  public async connect() {
    await this.client.connect();
  }

  public async onModuleDestroy() {
    await this.client.close();
  }
}
