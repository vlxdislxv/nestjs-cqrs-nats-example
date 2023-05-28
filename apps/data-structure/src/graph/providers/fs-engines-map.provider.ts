import { FsEngineEnum } from '@dsa/nats/services/graph/dto';
import { ValueProvider } from '@nestjs/common';
import { BfsEngine, DfsEngine, FsEngine } from '../core';

export const FsEnginesMapProvider: ValueProvider = {
  provide: 'FsEnginesMap',
  useValue: new Map<FsEngineEnum, FsEngine>([
    [FsEngineEnum.BREADTH, new BfsEngine()],
    [FsEngineEnum.DEPTH, new DfsEngine()],
  ]),
};
