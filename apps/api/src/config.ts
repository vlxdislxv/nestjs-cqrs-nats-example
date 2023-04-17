import { AppConfig, loadConfig } from '@dsa/common';

let cfg: Pick<AppConfig, 'http' | 'nats'> & {
  swagger: boolean;
};

export function appConfig() {
  if (!cfg) {
    cfg = loadConfig(['http', 'nats'], {
      http: {
        port: parseInt(process.env.HTTP_PORT || '3000'),
      },
      nats: {
        secret:
          process.env.NATS_SECRET ||
          'SUALY5RH4CR5AEZS62M57XN7AQYNT63XG6NL4ORI7JNY7HWCESDSWW3QSA',
      },
      swagger: process.env.SWAGGER_ENABLED !== '0' ?? true,
    });
  }

  return cfg;
}
