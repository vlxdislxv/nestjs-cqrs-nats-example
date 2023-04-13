export type AppConfig = {
  http?: {
    host: string;
    port: number;
  };

  nats?: {
    servers: string[];
    secret: string;
  };

  postgres?: {
    db: string;
    host: string;
    port: number;
    user: string;
    password: string;
  };
};
