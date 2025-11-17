import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePolaroidDto {
  @ApiProperty({
    description: 'Conteúdo do verso do polaroid',
    example: 'Minha lembrança especial',
  })
  @IsString()
  @IsNotEmpty()
  backContent: string;

  @ApiProperty({
    description: 'Número chave do polaroid',
    example: 2,
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  keyNumber: number;
}
