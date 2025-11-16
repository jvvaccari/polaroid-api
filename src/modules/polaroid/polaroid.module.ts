import { Module } from '@nestjs/common';
import { PolaroidController } from './polaroid.controller';
import { PolaroidService } from './polaroid.service';
import { PolaroidRepository } from './polaroid.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaRepository } from 'src/prisma/prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PolaroidController],
  providers: [
    {
      provide: PolaroidRepository,
      useFactory: (prisma: PrismaService) => {
        const prismaRepo = new PrismaRepository(prisma.polaroid);
        return new PolaroidRepository(prismaRepo);
      },
      inject: [PrismaService],
    },
    {
      provide: 'IRepository',
      useExisting: PolaroidRepository,
    },
    PolaroidService,
  ],
  exports: [PolaroidService],
})
export class PolaroidModule {}
