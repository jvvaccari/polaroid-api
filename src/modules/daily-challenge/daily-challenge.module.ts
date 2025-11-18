import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DailyChallengeController } from './daily-challenge.controller';
import { DailyChallengeService } from './daily-challenge.service';
import { DailyChallengeRepository } from './daily-challenge.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaRepository } from 'src/prisma/prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [DailyChallengeController],
  providers: [
    {
      provide: DailyChallengeRepository,
      useFactory: (prisma: PrismaService) => {
        const prismaRepo = new PrismaRepository(prisma.dailyChallenge);
        return new DailyChallengeRepository(prismaRepo);
      },
      inject: [PrismaService],
    },
    {
      provide: 'IRepository',
      useExisting: DailyChallengeRepository,
    },
    DailyChallengeService,
  ],
  exports: [DailyChallengeService],
})
export class DailyChallengeModule { }
