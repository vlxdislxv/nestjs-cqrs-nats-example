import { LinkedNode } from '../types';
import { FsEngine } from './fs-engine';

export class BfsEngine extends FsEngine {
  protected nextEl(queue: LinkedNode[]): LinkedNode {
    return queue.shift();
  }
}
