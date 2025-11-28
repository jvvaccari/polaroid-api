import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDailyChallengeDto {
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
}
