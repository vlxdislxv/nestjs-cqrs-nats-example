import { AppConfig, loadConfig } from '@dsa/common';

let cfg: Pick<Required<AppConfig>, 'http' | 'nats'>;

export function config() {
  if (!cfg) {
    cfg = loadConfig({
      http: {
        port: parseInt(process.env.HTTP_PORT || '3000'),
      },
      nats: {
        secret:
          process.env.NATS_SECRET ||
          'SUALLFSY6BS6VPGDLMS343GMNE73SHIOUK23XVZOZUTDZV5ZQP7ENXQQBY',
      },
    });
  }

  return cfg;
}
