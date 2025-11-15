import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DailyChallengeController } from './daily-challenge.controller';
import { DailyChallengeService } from './daily-challenge.service';

@Module({
  imports: [PrismaModule],
  controllers: [DailyChallengeController],
  providers: [DailyChallengeService],
})
export class DailyChallengeModule {}
