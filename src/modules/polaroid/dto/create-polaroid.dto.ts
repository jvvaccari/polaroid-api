import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePolaroidDto {
  @ApiProperty({ description: 'URL da imagem' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: 'Conteúdo do verso do polaroid' })
  @IsString()
  @IsNotEmpty()
  backContent: string;

  @ApiProperty({ description: 'Número chave do polaroid' })
  @IsInt()
  keyNumber: number;

  @ApiPropertyOptional({ description: 'Posição do polaroid' })
  @IsInt()
  @IsOptional()
  position?: number;

  @ApiPropertyOptional({
    description: 'Se o polaroid está ativo',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
