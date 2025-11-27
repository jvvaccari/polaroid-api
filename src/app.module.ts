import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PolaroidModule } from './modules/polaroid/polaroid.module';
import { DailyChallengeModule } from './modules/daily-challenge/daily-challenge.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, PolaroidModule, DailyChallengeModule],
})
export class AppModule {}
