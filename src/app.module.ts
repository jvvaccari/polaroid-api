import { Module } from '@nestjs/common';
import { PolaroidModule } from './modules/polaroid/polaroid.module';
import { DailyChallengeModule } from './modules/daily-challenge/daily-challenge.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PolaroidModule, DailyChallengeModule],
})
export class AppModule {}
