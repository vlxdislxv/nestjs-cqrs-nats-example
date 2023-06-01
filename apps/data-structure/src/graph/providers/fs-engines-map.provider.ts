import { FsEngineEnum } from '@dsa/svc/graph';
import { ValueProvider } from '@nestjs/common';
import { BfsEngine, DfsEngine, FsEngine } from '../svc/fs';

export const FsEnginesMapProvider: ValueProvider = {
  provide: 'FsEnginesMap',
  useValue: new Map<FsEngineEnum, FsEngine>([
    [FsEngineEnum.BREADTH, new BfsEngine()],
    [FsEngineEnum.DEPTH, new DfsEngine()],
  ]),
};
