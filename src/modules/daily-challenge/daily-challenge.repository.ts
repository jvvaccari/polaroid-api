import { Injectable } from '@nestjs/common';
import { DailyChallenge, Prisma } from '@prisma/client';
import { IRepository } from 'src/common/interface.repository';
import { PrismaRepository } from 'src/prisma/prisma.repository';

@Injectable()
export class DailyChallengeRepository
  implements
    IRepository<
      DailyChallenge,
      string,
      Prisma.DailyChallengeCreateInput,
      Prisma.DailyChallengeUpdateInput
    >
{
  constructor(
    protected readonly inner: PrismaRepository<
      DailyChallenge,
      Prisma.DailyChallengeWhereUniqueInput,
      Prisma.DailyChallengeCreateInput,
      Prisma.DailyChallengeUpdateInput
    >,
  ) {}

  async findAll(): Promise<DailyChallenge[]> {
    return this.inner.findAll();
  }

  async findOne(id: string): Promise<DailyChallenge | null> {
    return this.inner.findOne({ id });
  }

  async findByDate(
    startDate: string,
    endDate: string,
  ): Promise<DailyChallenge | null> {
    return this.inner.findFirst({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        polaroid: true,
      },
    });
  }

  async create(
    data: Prisma.DailyChallengeCreateInput,
  ): Promise<DailyChallenge> {
    return this.inner.create(data);
  }

  async update(
    id: string,
    data: Prisma.DailyChallengeUpdateInput,
  ): Promise<DailyChallenge> {
    return this.inner.update({ id }, data);
  }

  async delete(id: string): Promise<DailyChallenge> {
    return this.inner.delete({ id });
  }
}
