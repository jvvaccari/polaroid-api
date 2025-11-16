import { Module } from '@nestjs/common';
import { PolaroidController } from './polaroid.controller';
import { PolaroidService } from './polaroid.service';
import { PolaroidRepository } from './polaroid.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PolaroidController],
  providers: [
    PolaroidService,
    PolaroidRepository,
    {
      provide: 'IRepository',
      useExisting: PolaroidRepository,
    },
  ],
  exports: [PolaroidService],
})
export class PolaroidModule {}
