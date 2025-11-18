import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DailyChallengeService } from "./daily-challenge.service";
import { DailyChallengeResponseDto } from "./dto/daily-challenge-response.dto";
import { CreateDailyChallengeDto } from "./dto/create-daily-challenge.dto";
import { UpdateDailyChallengeDto } from "./dto/update-daily-challenge.dto";
import { PolaroidMapper } from "../polaroid/polaroid.mapper";

@ApiTags('daily-challenges')
@Controller('daily-challenges')
export class DailyChallengeController {
    constructor(
        private readonly dailyChallengeService: DailyChallengeService,
        private readonly polaroidMapper: PolaroidMapper
    ) { }


    @Get()
    @ApiOperation({ summary: 'Listar todos os desafios diários' })
    async findAll() {
        const challenges = await this.dailyChallengeService.findAll();
        return challenges.map((c) => new DailyChallengeResponseDto(c));
    }

    @Get('by-date')
    @ApiOperation({ summary: 'Listar um desafio diário pela data' })
    async findByDate(): Promise<DailyChallengeResponseDto | null> {
        const challenge = await this.dailyChallengeService.findByDate();

        if (!challenge) {
            throw new Error(`Desafio diário não encontrado`);
        }

        return new DailyChallengeResponseDto({
            ...challenge,
            polaroid: this.polaroidMapper.toResponse(challenge.polaroid)
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Listar um desafio diário pelo ID' })
    async findOne(@Param('id') id: string) {
        const challenge = await this.dailyChallengeService.findOne(id);

        if (!challenge) {
            throw new Error(`Desafio diário com id ${id} não encontrado`);
        }

        return new DailyChallengeResponseDto(challenge);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo desafio diário' })
    async create(@Body() createDailyChallengeDto: CreateDailyChallengeDto
    ): Promise<DailyChallengeResponseDto> {
        const challenge = await this.dailyChallengeService.create(createDailyChallengeDto);
        return new DailyChallengeResponseDto(challenge);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar um desafio diário pelo ID' })
    async update(@Param('id') id: string, @Body() updateDailyChallengeDto: UpdateDailyChallengeDto): Promise<DailyChallengeResponseDto> {
        const challenge = await this.dailyChallengeService.update(id, updateDailyChallengeDto);
        return new DailyChallengeResponseDto(challenge);
    }
}
