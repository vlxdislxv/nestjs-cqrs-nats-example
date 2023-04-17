export type CQServiceType = 'COMMAND' | 'QUERY' | 'BOTH';

export type HttpConfig = {
  host: string;
  port: number;
};

export type NatsConfig = {
  servers: string[];
  secret: string;
};

export type PostgresConfig = {
  database: string;
  host: string;
  port: number;
  user: string;
  password: string;
};

export type AppConfig = {
  cqstype: CQServiceType;
  http: HttpConfig;
  nats: NatsConfig;
  postgres: PostgresConfig;
};
