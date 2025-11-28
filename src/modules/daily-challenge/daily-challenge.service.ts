import { Inject, Injectable } from '@nestjs/common';
import { DailyChallenge, Polaroid, Prisma } from '@prisma/client';
import type { IRepository } from 'src/common/interface.repository';
import { CreateDailyChallengeDto } from './dto/create-daily-challenge.dto';
import { createID } from 'src/utils/createID';
import { createDate } from 'src/utils/createDate';
import { UpdateDailyChallengeDto } from './dto/update-daily-challenge.dto';

type DailyChallengeWithPolaroid = DailyChallenge & { polaroid: Polaroid };

@Injectable()
export class DailyChallengeService {
  constructor(
    @Inject('IRepository')
    private readonly dailyChallengeRepository: IRepository<
      DailyChallenge,
      string,
      Prisma.DailyChallengeCreateInput,
      Prisma.DailyChallengeUpdateInput
    >,
  ) {}

  async findAll(): Promise<DailyChallenge[]> {
    return this.dailyChallengeRepository.findAll();
  }

  async findOne(id: string): Promise<DailyChallenge | null> {
    return this.dailyChallengeRepository.findOne(id);
  }

  async findByDate(): Promise<DailyChallengeWithPolaroid | null> {
    const currentDate = new Date();

    // Ajuste para o timezone do Brasil (GMT-3)
    const timezoneOffset = -3 * 60; // minutos
    const localDate = new Date(currentDate.getTime() + timezoneOffset * 60000);

    const startOfDay = new Date(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      0,
      0,
      0,
      0,
    );
    const endOfDay = new Date(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      23,
      59,
      59,
      999,
    );

    const res = this.dailyChallengeRepository.findByDate
      ? await this.dailyChallengeRepository.findByDate(
          startOfDay.toISOString(),
          endOfDay.toISOString(),
        )
      : null;

    return res as DailyChallengeWithPolaroid | null;
  }

  async create(createDailyChallengeDto: CreateDailyChallengeDto) {
    return this.dailyChallengeRepository.create({
      id: createID(),
      date: createDate(createDailyChallengeDto.date),
      polaroid: {
        connect: { id: createDailyChallengeDto.polaroidId },
      },
    } as Prisma.DailyChallengeCreateInput);
  }

  async update(
    id: string,
    data: UpdateDailyChallengeDto,
  ): Promise<DailyChallenge> {
    return this.dailyChallengeRepository.update(id, {
      ...data,
      date:
        data.date && (typeof data.date === 'string' || data.date)
          ? createDate(data.date.toString())
          : undefined,
    });
  }

  async delete(id: string): Promise<DailyChallenge> {
    return this.dailyChallengeRepository.delete(id);
  }
}
