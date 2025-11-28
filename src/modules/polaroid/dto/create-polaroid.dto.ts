import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePolaroidDto {
  @ApiProperty({
    description: 'Conteúdo do verso do polaroid',
    example: 'Minha lembrança especial',
    type: String,
  })
  @IsString()
  @IsOptional()
  backContent: string | null;

  @ApiProperty({
    description: 'Número chave do polaroid',
    example: 2,
    type: Number,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  keyNumber?: number | null;
}
