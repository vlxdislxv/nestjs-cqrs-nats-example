import { ClientProxy, RpcException } from '@nestjs/microservices';
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
      if (err.type === 'BadRequestRpcException') {
        throw new RpcException(err);
      }

      err.message += `|RpcTopic:${topic}`;

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
