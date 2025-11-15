import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PolaroidController } from './polaroid.controller';
import { PolaroidService } from './polaroid.service';

@Module({
  imports: [PrismaModule],
  controllers: [PolaroidController],
  providers: [PolaroidService],
})
export class PolaroidModule {}
