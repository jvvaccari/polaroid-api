import { Inject, Injectable } from "@nestjs/common";
import { DailyChallenge, Prisma } from "@prisma/client";
import type { IRepository } from "src/common/interface.repository";
import { CreateDailyChallengeDto } from "./dto/create-daily-challenge.dto";
import { createID } from "src/utils/createID";
import { createDate } from "src/utils/createDate";

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
    ) { }

    async findAll(): Promise<DailyChallenge[]> {
        return this.dailyChallengeRepository.findAll();
    }

    async findOne(id: string): Promise<DailyChallenge | null> {
        return this.dailyChallengeRepository.findOne(id);
    }

    async findByDate(): Promise<DailyChallenge | null> {
        const currentDate = new Date();

        // Criar data UTC para início do dia (00:00:00)
        const startOfDay = new Date(Date.UTC(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate(),
            0, 0, 0, 0
        ));

        // Criar data UTC para fim do dia (23:59:59.999)
        const endOfDay = new Date(Date.UTC(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate(),
            23, 59, 59, 999
        ));

        console.log('Finding daily challenge between:', startOfDay.toISOString(), 'and', endOfDay.toISOString());

        const res = this.dailyChallengeRepository.findByDate
            ? await this.dailyChallengeRepository.findByDate(startOfDay.toISOString(), endOfDay.toISOString())
            : null;

        console.log('Found daily challenge:', res);
        return res;
    }

    async create(createDailyChallengeDto: CreateDailyChallengeDto) {
        return this.dailyChallengeRepository.create({
            id: createID(),
            date: createDate(createDailyChallengeDto.date),
            polaroid: {
                connect: { id: createDailyChallengeDto.polaroidId }
            }
        } as Prisma.DailyChallengeCreateInput);
    }

    async update(id: string, data: Prisma.DailyChallengeUpdateInput): Promise<DailyChallenge> {
        return this.dailyChallengeRepository.update(id, { ...data, date: data.date ? createDate(data.date.toString()) : undefined });
    }

    async delete(id: string): Promise<DailyChallenge> {
        return this.dailyChallengeRepository.delete(id);
    }
}
