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
