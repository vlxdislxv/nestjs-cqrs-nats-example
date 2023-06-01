import { LinkedNode } from '../types';
import { FsEngine } from './fs-engine';

export class DfsEngine extends FsEngine {
  protected nextEl(queue: LinkedNode[]): LinkedNode {
    return queue.pop();
  }
}
