import { ApiProperty } from "@nestjs/swagger";
import { DailyChallenge } from "@prisma/client";
import { IsBoolean, isBoolean, IsString } from "class-validator";

export class DailyChallengeResponseDto {
    @ApiProperty({
        description: 'Data do desafio diário no formato ISO 8601',
        example: '2023-10-15',
        type: String,
    })
    @IsString()
    date: string;

    @ApiProperty({
        description: 'ID do polaroid associado ao desafio diário',
        example: 'abc123def456ghi789jkl012',
        type: String,
    })
    @IsString()
    polaroidId: string;

    @ApiProperty({ description: 'Data de criação' })
    createdAt: Date;

    @ApiProperty({ description: 'Data de atualização' })
    updatedAt: Date;

    constructor(partial: Partial<DailyChallenge>) {
        Object.assign(this, partial);
    }
}