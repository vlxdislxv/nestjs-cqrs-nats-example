import { AppConfig, loadConfig } from '@dsa/common';

let cfg: Pick<AppConfig, 'nats' | 'postgres' | 'cqstype'>;

export function appConfig() {
  if (!cfg) {
    cfg = loadConfig(['nats', 'postgres', 'cqstype'], {
      nats: {
        secret:
          process.env.NATS_SECRET ||
          'SUAGLRB2G2DJHZKXBZMT23S7J3FLCN4JI6DR3M7FSXCPTERVK4BKLDJHA4',
      },
      postgres: {
        database: 'data_structure',
      },
    });
  }

  return cfg;
}
