import { merge } from 'lodash';

const defaults = {
  http: {
    host: process.env.HTTP_HOST || '0.0.0.0',
  },
  nats: {
    servers: process.env.NATS_SERVERS?.split(',') || ['localhost:4222'],
  },
  postgres: {
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: parseInt(process.env.POSTGRES_PORT || '5632'),
    user: process.env.POSTGRES_USER || 'dsa',
    password: process.env.POSTGRES_PASSWORD || 'password',
  },
};

export function loadConfig<V>(trValues: V) {
  return merge(defaults, trValues);
}
