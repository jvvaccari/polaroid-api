import { Module } from '@nestjs/common';
import { PolaroidModule } from './modules/polaroid/polaroid.module';

@Module({
  imports: [PolaroidModule],
})
export class AppModule {}
