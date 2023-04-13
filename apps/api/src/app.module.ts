import { Module } from '@nestjs/common';
import { GraphModule } from './graph';

@Module({
  imports: [GraphModule],
})
export class AppModule {}
