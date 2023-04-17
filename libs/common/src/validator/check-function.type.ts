import { AsyncCheckFunction, SyncCheckFunction } from 'fastest-validator';

export type CheckFunction = AsyncCheckFunction | SyncCheckFunction;
